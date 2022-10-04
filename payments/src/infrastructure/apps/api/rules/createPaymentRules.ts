import { checkSchema } from "express-validator";


const createPaymentRules = checkSchema({
    token: {
        in: 'body',
        notEmpty: true,
        errorMessage: "token order is empty or missing",
    },
    orderId: {
        in: 'body',
        notEmpty: true,
        errorMessage: "order ID is empty or missing",
    }
});

export { createPaymentRules };