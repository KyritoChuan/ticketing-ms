import mongoose, { Schema } from 'mongoose';
import { TicketEntity } from '../../../../domain/entities/ticketEntity';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';


interface TicketProps {
    title: string;
    price: number;
    userId: string;
}

interface TicketDocument extends mongoose.Document, TicketEntity { }

interface TicketModel extends mongoose.Model<TicketDocument> {
    build(props: TicketProps): TicketDocument;
}

const ticketSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
    },
}, {
    toJSON: {
        transform(_doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

//versioning, add plugin and change name "_v" to "version".
ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin, { strategy: 'version' });


ticketSchema.statics.build = (props: TicketProps) => {
    return new Ticket(props);
}

const Ticket = mongoose.model<TicketDocument, TicketModel>('Ticket', ticketSchema);

export { Ticket };