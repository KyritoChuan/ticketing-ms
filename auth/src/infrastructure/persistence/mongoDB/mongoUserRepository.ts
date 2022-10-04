import { UserRepository } from '../../../domain/repositories/userRepository';
import { UserEntity } from '../../../domain/entities/user';
import { Nullable } from '../../../domain/entities/nullable';
import { User as UserSchema } from '../../persistence/mongoDB/schemas/userSchema';
import { BadRequestError } from '@tickets-kyrito/common';



export class MongoUserRepository implements UserRepository {
    async addUser(newUser: UserEntity): Promise<Nullable<UserEntity>> {
        const userDB = new UserSchema(newUser);

        try {
            const saveResponse = await userDB.save();
            if (!saveResponse)
                return null;
            else
                return saveResponse;

        } catch (error) {
            console.log("Error in server {4}: AddUser: " + error);
            throw new BadRequestError("User already exists.");
        }
    };

    async findUserByEmail(email: string): Promise<Nullable<UserEntity>> {
        try {
            const userResponse = await UserSchema.findOne({ email });
            return userResponse;
        } catch (error) {
            console.log("Error in server {1}: FindUserByEmail: " + error);
            throw new BadRequestError("Error to looking for a user by email.");
        }
    };
}