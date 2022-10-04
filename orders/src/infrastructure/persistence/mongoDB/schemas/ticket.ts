import mongoose, { Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { TicketEntity } from '../../../../domain/entities/ticketEntity';
import { Order, OrderStatus } from './order';


interface TicketProps {
    id: string;
    title: string;
    price: number;
}

interface TicketDocument extends mongoose.Document, TicketEntity { }

interface TicketModel extends mongoose.Model<TicketDocument> {
    build(props: TicketProps): TicketDocument;
    findByIdAndPreviousVersion(event: { id: string, version: number }): Promise<TicketDocument | null>;
}

const ticketSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    }
}, {
    toJSON: {
        transform(_doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (props: TicketProps) => {
    return new Ticket({
        ...props,
        _id: props.id,
    });
}

ticketSchema.statics.findByIdAndPreviousVersion = (event: { id: string, version: number }) => {
    return Ticket.findOne({
        _id: event.id,
        version: event.version - 1,
    });
}

ticketSchema.methods.isReserved = async function () {
    const existingOrder = await Order.findOne({
        ticket: this,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete,
            ]
        }
    });


    return existingOrder ? true : false;
}

const Ticket = mongoose.model<TicketDocument, TicketModel>('Ticket', ticketSchema);

export { Ticket, TicketDocument };