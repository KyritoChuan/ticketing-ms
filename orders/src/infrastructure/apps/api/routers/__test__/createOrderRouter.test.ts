import mongoose from "mongoose";
import request from 'supertest';
import app from '../../app';
import { Order, OrderStatus } from "../../../../persistence/mongoDB/schemas/order";
import { Ticket } from "../../../../persistence/mongoDB/schemas/ticket";
import { natsWrapper } from "../../utils/natsWrapper";


it('returns an error if the ticket does not exist', async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app).post('/api/orders').set('Cookie', global.registerTest()).send({
        ticketId
    }).expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20000
    });
    await ticket.save();

    const order = Order.build({
        userId: 'qwertyuiop',
        status: OrderStatus.Created,
        expiresAt: new Date(),
        ticket,
    })
    await order.save();

    await request(app).post('/api/orders').set('Cookie', global.registerTest()).send({
        ticketId: ticket.id
    }).expect(400);
});

it('reserves a ticket', async () => {
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20000
    });
    await ticket.save();

    await request(app).post('/api/orders').set('Cookie', global.registerTest()).send({
        ticketId: ticket.id
    }).expect(201);
});


it('emits an order created event', async () => {
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20000
    });
    await ticket.save();

    await request(app).post('/api/orders').set('Cookie', global.registerTest()).send({
        ticketId: ticket.id
    }).expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});