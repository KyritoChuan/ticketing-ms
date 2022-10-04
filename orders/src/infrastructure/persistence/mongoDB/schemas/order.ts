import mongoose, { Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { OrderEntity } from '../../../../domain/entities/orderEntity';
import { OrderStatus } from '@tickets-kyrito/common';
import { TicketDocument } from './ticket';

interface OrderProps {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketDocument;
}

interface OrderDocument extends mongoose.Document, OrderEntity { }

interface OrderModel extends mongoose.Model<OrderDocument> {
    build(props: OrderProps): OrderDocument;
}

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created,
    },
    expiresAt: {
        type: Schema.Types.Date,
    },
    ticket: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
    }
}, {
    toJSON: {
        transform(_doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (props: OrderProps) => {
    return new Order(props);
}

const Order = mongoose.model<OrderDocument, OrderModel>('Order', orderSchema);

export { Order, OrderStatus };