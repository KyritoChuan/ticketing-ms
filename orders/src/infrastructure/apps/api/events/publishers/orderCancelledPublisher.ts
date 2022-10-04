import { Publisher, Subjects, OrderCancelledEvent } from '@tickets-kyrito/common';


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}