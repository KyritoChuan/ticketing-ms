import { Publisher, Subjects, TicketCreatedEvent } from '@tickets-kyrito/common';


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}