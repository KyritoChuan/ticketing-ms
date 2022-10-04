import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routers/currentUserRouter';
import { loginRouter } from './routers/loginRouter';
import { logoutRouter } from './routers/logoutRouter';
import { registerRouter } from './routers/registerRouter';
import { errorHandler, NotFoundError } from '@tickets-kyrito/common';


const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);

app.use(currentUserRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(registerRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;