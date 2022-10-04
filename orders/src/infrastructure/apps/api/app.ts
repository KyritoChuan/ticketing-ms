import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@tickets-kyrito/common';
import { createOrderRouter } from './routers/createOrderRouter';
import { indexOrderRouter } from './routers/indexOrderRouter';
import { showOrderRouter } from './routers/showOrderRouter';
import { deleteOrderRouter } from './routers/deleteOrderRouter';



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

app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(createOrderRouter);
app.use(deleteOrderRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;