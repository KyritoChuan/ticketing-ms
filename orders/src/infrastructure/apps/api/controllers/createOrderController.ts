import { Request, Response } from "express";
import { OrderCreatedPublisher } from "../events/publishers/orderCreatedPublisher";
import { natsWrapper } from '../utils/natsWrapper';
import { CreatorOrderUseCase } from '../../../../application/creatorOrderUseCase';
import { MongoOrderRepository } from '../../../persistence/mongoDB/mongoOrderRepository';
import { MongoTicketRepository } from '../../../persistence/mongoDB/mongoTicketRepository';



export async function createOrderController(req: Request, res: Response) {
    //Find the ticket the user is trying to order in the database
    const { ticketId } = req.body;
    const currentUserId = req.currentUser!.id;

    const orderRepository = new MongoOrderRepository();
    const ticketRepository = new MongoTicketRepository();
    const creatorOrderUseCase = new CreatorOrderUseCase(orderRepository, ticketRepository);

    const order = await creatorOrderUseCase.run(ticketId, currentUserId);

    // const ticket = await Ticket.findById(ticketId);

    // if (!ticket)
    //     throw new NotFoundError();
    // //Make sure that this ticket is not already reserved
    // //Run query to look at all orders. Find an order where the ticket is the ticket we just found
    // //*and* the orders status is *not* cancelled.
    // //If we find an order from that means the ticket *is* reserved.
    // const isReserved = await ticket.isReserved();

    // if (isReserved) {
    //     throw new BadRequestError("Ticket is already reserved.");
    // }

    // //Calculate an expiration date for this order
    // const expiration = new Date();
    // expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // //Build the order and save it to the database
    // const order = Order.build({
    //     userId: req.currentUser!.id,
    //     status: OrderStatus.Created,
    //     expiresAt: expiration,
    //     ticket: ticket,
    // });
    // await order.save();

    //Publish an event saying that an order was created.
    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        status: order.status,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
            id: order.ticket.id,
            price: order.ticket.price
        },
        version: order.version!,
    });

    res.status(201).send(order);
}