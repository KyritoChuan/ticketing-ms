import { CustomError } from '@tickets-kyrito/common';


export class EncryptPasswordError extends CustomError {
    statusCode: number = 400;
    constructor() {
        super("Error in encrypt password.");
        Object.setPrototypeOf(this, EncryptPasswordError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}