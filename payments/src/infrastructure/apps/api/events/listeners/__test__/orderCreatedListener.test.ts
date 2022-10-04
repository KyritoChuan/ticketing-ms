import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../utils/natsWrapper';
import { OrderCreatedListener } from '../orderCreatedListener';
import { OrderCreatedEvent, OrderStatus } from '@tickets-kyrito/common';
import { Order } from '../../../../../persistence/mongoDB/schemas/order';



const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        expiresAt: "qwertyu",
        userId: "qwertyuipi",
        status: OrderStatus.Created,
        ticket: {
            id: "qwertyufdgh",
            price: 1000
        }
    }

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, data, msg };
}

it('replicates the order info', async () => {
    const { listener, data, msg } = await setup();
    await listener.onMessage(data, msg);

    const order = await Order.findById(data.id);

    expect(order!.price).toEqual(data.ticket.price);
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup();
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});