import { UserEntity } from '../entities/user';
import { Nullable } from '../entities/nullable';

export interface UserRepository {
    findUserByEmail: (email: string) => Promise<Nullable<UserEntity>>;
    addUser: (newUser: UserEntity) => Promise<Nullable<UserEntity>>;
}