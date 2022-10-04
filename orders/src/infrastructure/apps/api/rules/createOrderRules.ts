import { checkSchema } from 'express-validator';
import mongoose from 'mongoose';

const createOrderRules = checkSchema({
    ticketId: {
        in: 'body',
        notEmpty: true,
        errorMessage: "TicketId is empty or missing",
        custom: {
            options: (value) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error('The ticketId must be provided.');
                } else {
                    return value;
                }
            }
        }
    },
});

export { createOrderRules };