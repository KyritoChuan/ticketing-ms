import { CustomError } from '@tickets-kyrito/common';



export class NotFoundTicketError extends CustomError {
    statusCode: number = 404;

    constructor() {
        super("Not found the ticket by ID");
        Object.setPrototypeOf(this, NotFoundTicketError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}