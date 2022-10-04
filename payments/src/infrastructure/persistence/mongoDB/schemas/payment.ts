import mongoose from "mongoose";

interface PaymentProps {
    orderId: string;
    chargeId: string;
}

interface PaymentDocument extends mongoose.Document {
    orderId: string;
    chargeId: string;
    version: number;
}

interface PaymentModel extends mongoose.Model<PaymentDocument> {
    build(props: PaymentProps): PaymentDocument;
}

const paymentSchema = new mongoose.Schema({
    orderId: {
        required: true,
        type: String,
    },
    chargeId: {
        required: true,
        type: String,
    }
}, {
    toJSON: {
        transform(_doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

paymentSchema.statics.build = (props: PaymentProps) => {
    return new Payment(props);
}

const Payment = mongoose.model<PaymentDocument, PaymentModel>('Payment', paymentSchema);

export { Payment };
