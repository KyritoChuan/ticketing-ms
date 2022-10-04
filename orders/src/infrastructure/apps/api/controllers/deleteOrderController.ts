import { Request, Response } from "express";
import { OrderCancelledPublisher } from '../events/publishers/orderCancelledPublisher';
import { natsWrapper } from '../utils/natsWrapper';
import { CancelOrderUseCase } from '../../../../application/cancelOrderUseCase';
import { MongoOrderRepository } from "../../../persistence/mongoDB/mongoOrderRepository";



export async function deleteOrderController(req: Request, res: Response) {
    const { orderId } = req.params;
    const orderRepository = new MongoOrderRepository();
    const cancelOrderUseCase = new CancelOrderUseCase(orderRepository);

    const order = await cancelOrderUseCase.run(orderId, req.currentUser!.id);

    //publishing an event saying this was cancelled.
    new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        ticket: {
            id: order.ticket.id,
        },
        version: order.version!,
    });

    res.status(204).send(order);
}