import { ExpirationCompleteEvent, Subjects, Publisher } from '@tickets-kyrito/common';


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}