import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@tickets-kyrito/common";
import { Ticket } from "../../../../persistence/mongoDB/schemas/ticket";
import { queueGroupName } from "./queueGroupName";


export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const { title, price } = data;
        const ticket = await Ticket.findByIdAndPreviousVersion(data);

        if (!ticket) {
            throw new Error('Ticket not Found');
        }

        ticket.set({
            title,
            price
        });
        await ticket.save();

        msg.ack();
    }
}