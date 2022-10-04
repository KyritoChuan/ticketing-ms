import { Listener, OrderStatus, PaymentCreatedEvent, Subjects } from '@tickets-kyrito/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../../persistence/mongoDB/schemas/order';
import { queueGroupName } from './queueGroupName';




export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId);

        if (!order) {
            throw new Error('Order not found');
        }

        order.set({
            status: OrderStatus.Complete,
        });
        await order.save();

        //Aqui se debería emitir un publish para actualizar la versión del Order (como cambió el status).
        //Pero como a partir de aquí se termina el flujo y no va más, queda como opcional.

        msg.ack();
    }
}