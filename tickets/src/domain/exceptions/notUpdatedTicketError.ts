import { CustomError } from '@tickets-kyrito/common';



export class NotUpdatedUserError extends CustomError {
    statusCode: number = 400;

    constructor() {
        super("Error in update Ticket");
        Object.setPrototypeOf(this, NotUpdatedUserError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}