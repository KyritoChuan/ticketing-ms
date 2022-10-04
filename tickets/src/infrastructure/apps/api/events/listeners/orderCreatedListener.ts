import { Listener, Subjects, OrderCreatedEvent } from '@tickets-kyrito/common';
import { Ticket } from '../../../../persistence/mongoDB/schemas/ticket';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { TicketUpdatedPublisher } from '../publishers/ticketUpdatedPublisher';



export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id);

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        ticket.set({ orderId: data.id });
        await ticket.save();

        //Es necesario el await aquí, para que se controle que, en caso de que caiga el publish
        // no llegue al ack y vuelva a ejecutarse este listener.
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version: ticket.version,
        });

        msg.ack();
    }
}