import { Request, Response } from "express";
import { MongoUserRepository } from '../../../persistence/mongoDB/mongoUserRepository';
import { AuthServiceImpl } from '../../../implementations/authServiceImpl';
import { User } from "../../../persistence/mongoDB/schemas/userSchema";
import { RegisterUserUseCase } from '../../../../application/registerUserUseCase';


export async function registerController(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = User.build({
        email: email,
        password: password,
    });

    const userRepository = new MongoUserRepository();
    const authService = new AuthServiceImpl();
    const registerUserUseCase = new RegisterUserUseCase(userRepository, authService);

    const registerUserResponse = await registerUserUseCase.run(user);

    const userJwt = authService.generateAuth(registerUserResponse);

    //Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(registerUserResponse);
}
