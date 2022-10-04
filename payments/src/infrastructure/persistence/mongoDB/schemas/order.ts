import mongoose, { Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { OrderStatus } from '@tickets-kyrito/common';

interface OrderProps {
    id: string;
    version: number;
    userId: string;
    price: number;
    status: OrderStatus;
}

interface OrderDocument extends mongoose.Document {
    version: number;
    userId: string;
    price: number;
    status: OrderStatus;
}

interface OrderModel extends mongoose.Model<OrderDocument> {
    build(props: OrderProps): OrderDocument;
}

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
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
    return new Order({
        _id: props.id,
        version: props.version,
        price: props.price,
        userId: props.userId,
        status: props.status,
    });
}

const Order = mongoose.model<OrderDocument, OrderModel>('Order', orderSchema);

export { Order };