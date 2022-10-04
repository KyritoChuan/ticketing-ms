import { Subjects, Publisher, PaymentCreatedEvent } from "@tickets-kyrito/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}