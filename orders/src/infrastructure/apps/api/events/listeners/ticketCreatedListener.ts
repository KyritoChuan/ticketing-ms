import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@tickets-kyrito/common";
import { Ticket } from "../../../../persistence/mongoDB/schemas/ticket";
import { queueGroupName } from "./queueGroupName";


export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        const { id, title, price } = data;

        const ticket = Ticket.build({
            id,
            title,
            price
        });
        await ticket.save();

        msg.ack();
    }
}