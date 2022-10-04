import { OrderRepository } from '../domain/repositories/orderRepository';
import { OrderEntity } from '../domain/entities/orderEntity';
import { TicketRepository } from '../domain/repositories/ticketRepository';
import { BadRequestError, OrderStatus } from '@tickets-kyrito/common';
import { NotFoundError } from '@tickets-kyrito/common';


const EXPIRATION_WINDOW_SECONDS = 15 * 60;


export class CreatorOrderUseCase {
    private readonly _orderRepository: OrderRepository;
    private readonly _ticketRepository: TicketRepository;

    constructor(orderRepository: OrderRepository, ticketRepository: TicketRepository) {
        this._orderRepository = orderRepository;
        this._ticketRepository = ticketRepository;
    }

    async run(ticketId: string, currentUserId: string): Promise<OrderEntity> {
        const ticket = await this._ticketRepository.findTicketById(ticketId);

        if (!ticket)
            throw new NotFoundError();
        //Make sure that this ticket is not already reserved
        //Run query to look at all orders. Find an order where the ticket is the ticket we just found
        //*and* the orders status is *not* cancelled.
        //If we find an order from that means the ticket *is* reserved.
        const isReserved = await ticket.isReserved();

        if (isReserved) {
            throw new BadRequestError("Ticket is already reserved.");
        }

        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

        const order: OrderEntity = {
            userId: currentUserId,
            status: OrderStatus.Created,
            expiresAt: expiration,
            ticket: ticket,
        }

        const orderResponse = await this._orderRepository.addOrder(order);
        return orderResponse;
    }
}