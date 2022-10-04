import { checkSchema } from 'express-validator';

const createTicketRules = checkSchema({
    title: {
        in: 'body',
        notEmpty: true,
        errorMessage: "title is required"
    },
    price: {
        in: 'body',
        isFloat: {
            options: { gt: 0 },
            errorMessage: "Price must be greater than 0"
        },
    }
});

export { createTicketRules };