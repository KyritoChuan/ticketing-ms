import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@tickets-kyrito/common';
import { createPaymentRouter } from './routers/createPaymentRouter';



const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);
app.use(currentUser);

app.use(createPaymentRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;