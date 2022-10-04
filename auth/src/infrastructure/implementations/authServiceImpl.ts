import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { AuthService } from "../../domain/services/authService";
import { Nullable } from '../../domain/entities/nullable';
import { UserEntity } from "../../domain/entities/user";


export class AuthServiceImpl implements AuthService {
    generateAuth(user: UserEntity): string {
        //Generate JWT
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        },
            process.env.JWT_KEY! // Le digo a TS que no valide esto, que si o si vendrá como string.
        );

        return userJwt;
    };

    verifyAuth(auth: string): any {
        try {
            //Si el JWT está editado por un tercero, entra en el catch.
            const payload = jwt.verify(
                auth,
                process.env.JWT_KEY!
            );
            return payload;
        } catch (error) {
            return null;
        }
    }


    encryptPassword(password: string): Nullable<string> {
        try {
            const hashPassword: string = bcrypt.hashSync(password, 0);
            return hashPassword;

        } catch (error) {
            console.log("error in EncryptPassword {1}: " + error);
            return null;
        }
    };
    comparePassword(password: string, encryptedPassword: string): Nullable<boolean> {
        try {
            const isCorrectPassword: boolean = bcrypt.compareSync(password, encryptedPassword);
            return isCorrectPassword;

        } catch (error) {
            console.log("error in ComparePassword {2}: " + error);
            return null;
        }
    };

}