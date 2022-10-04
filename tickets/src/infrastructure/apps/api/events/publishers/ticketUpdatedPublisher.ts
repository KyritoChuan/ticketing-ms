import { Publisher, Subjects, TicketUpdatedEvent } from '@tickets-kyrito/common';


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}