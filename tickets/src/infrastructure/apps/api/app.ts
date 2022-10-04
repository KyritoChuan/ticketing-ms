import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@tickets-kyrito/common';
import { createTicketRouter } from './routes/createTicketRouter';
import { showTicketRouter } from './routes/showTicketRouter';
import { indexTicketRouter } from './routes/indexTicketRouter';
import { updateTicketRouter } from './routes/updateTicketRouter';


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

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);


app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;