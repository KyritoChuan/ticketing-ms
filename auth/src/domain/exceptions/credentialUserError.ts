import { CustomError } from '@tickets-kyrito/common';


export class CredentialUserError extends CustomError {
    statusCode: number = 400;
    constructor() {
        super("User or password are incorrects.");
        Object.setPrototypeOf(this, CredentialUserError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}