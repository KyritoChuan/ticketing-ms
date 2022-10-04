import { Nullable } from '../entities/nullable';
import { UserEntity } from '../entities/user';


export interface AuthService {
    generateAuth: (user: UserEntity) => string;
    verifyAuth: (auth: string) => any;
    encryptPassword: (password: string) => Nullable<string>;
    comparePassword: (password: string, encryptedPassword: string) => Nullable<boolean>;
}