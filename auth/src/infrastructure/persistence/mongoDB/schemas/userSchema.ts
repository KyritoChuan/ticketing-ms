import mongoose, { Schema } from "mongoose";
import { UserEntity } from '../../../../domain/entities/user';

//An interface that describes the properties
//that are required to create a new User
interface UserProps {
    email: string;
    password: string;
}

//An interface that describes the properties that a User Model has.
interface UserModel extends mongoose.Model<UserDocument> {
    build(props: UserProps): UserDocument;
}

//An interface that describes the properties that a User Document has.
interface UserDocument extends mongoose.Document, UserEntity { }


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        toJSON: {
            transform(_doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            }
        }
    });

userSchema.statics.build = (userProps: UserProps) => {
    return new User(userProps);
}

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);


export { User };