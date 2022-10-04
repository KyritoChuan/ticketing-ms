import { checkSchema } from 'express-validator';


const registerUserRules = checkSchema({
    email: {
        in: ['body'],
        notEmpty: true,
        isEmail: true,
        normalizeEmail: true,
        errorMessage: "Incorrect format or missing email in the body."
    },
    password: {
        in: ['body'],
        notEmpty: true,
        isString: true,
        isLength: {
            options: { min: 4, max: 20 },
            errorMessage: "Password must be between 4 and 20 characters"
        },
        errorMessage: "Password is required."
    },
    repeatPassword: {
        in: ['body'],
        notEmpty: true,
        isString: true,
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('The passwords are not equals.');
                } else {
                    return value;
                }
            }
        },
    }

});

export { registerUserRules };