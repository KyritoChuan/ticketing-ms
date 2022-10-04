import request from 'supertest';
import app from '../../app';
import { natsWrapper } from '../../utils/natsWrapper';


it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app).post('/api/tickets').send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is login', async () => {
    await request(app).post('/api/tickets').send({}).expect(401);
});

it('returns a status other than 401 if the user is login', async () => {
    const response = await request(app).post('/api/tickets')
        .set('Cookie', global.registerTest())
        .send({});

    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
    await request(app).post('/api/tickets')
        .set('Cookie', global.registerTest()).send({
            title: '',
            price: 10
        }).expect(400);

    await request(app).post('/api/tickets')
        .set('Cookie', global.registerTest()).send({
            price: 10
        }).expect(400);
});

it('returns an error if an invalid price is provided', async () => {
    await request(app).post('/api/tickets')
        .set('Cookie', global.registerTest()).send({
            title: 'qweertyuiop',
            price: -10
        }).expect(400);

    await request(app).post('/api/tickets')
        .set('Cookie', global.registerTest()).send({
            title: 'qweertyuiop'
        }).expect(400);
});

it('creates a ticket with valid inputs', async () => {
    //Add in a check to make sure a ticket was saved.

    await request(app).post('/api/tickets')
        .set('Cookie', global.registerTest()).send({
            title: 'qweertyuiop',
            price: 10
        }).expect(201);
});

it('publishes an event', async () => {
    const title = 'qwertyuiop';

    await request(app).post('/api/tickets')
        .set('Cookie', global.registerTest()).send({
            title,
            price: 10
        }).expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});