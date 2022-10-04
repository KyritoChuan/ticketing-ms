import { Request, Response } from "express";
import { BadRequestError, NotAuthorizatedError, NotFoundError, OrderStatus } from "@tickets-kyrito/common";
import { Order } from "../../../persistence/mongoDB/schemas/order";
import { stripe } from "../utils/stripe";
import { Payment } from "../../../persistence/mongoDB/schemas/payment";
import { PaymentCreatedPublisher } from '../events/publishers/paymentCreatedPublisher';
import { natsWrapper } from '../../../../../../expiration/src/utils/natsWrapper';



export async function createPaymentController(req: Request, res: Response) {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order)
        throw new NotFoundError();

    if (order.userId !== req.currentUser!.id)
        throw new NotAuthorizatedError();

    console.log("estado de order en controller: " + order);
    if (order.status === OrderStatus.Cancelled)
        throw new BadRequestError("Cannot pay for an cancelled order.");

    const charge = await stripe.charges.create({
        currency: 'clp',
        amount: order.price,
        source: token,
    });

    const payment = Payment.build({
        orderId,
        chargeId: charge.id,
    });
    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: payment.id,
        orderId: payment.orderId,
        chargeId: payment.chargeId,
    });

    res.status(201).send({ id: payment.id });
}