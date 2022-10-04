import { CustomError } from '@tickets-kyrito/common';


export class ExistingUserError extends CustomError {
    statusCode: number = 400;
    constructor() {
        super("The user is already registered.");
        Object.setPrototypeOf(this, ExistingUserError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}