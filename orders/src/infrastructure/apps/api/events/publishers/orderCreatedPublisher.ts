import { Publisher, Subjects, OrderCreatedEvent } from '@tickets-kyrito/common';


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}