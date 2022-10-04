import { CustomError } from '@tickets-kyrito/common';



export class NotCreatedUserError extends CustomError {
    statusCode: number = 400;

    constructor() {
        super("Error in create Ticket");
        Object.setPrototypeOf(this, NotCreatedUserError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}