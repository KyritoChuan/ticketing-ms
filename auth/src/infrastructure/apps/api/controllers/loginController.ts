import { Request, Response } from 'express';
import { MongoUserRepository } from '../../../persistence/mongoDB/mongoUserRepository';
import { AuthServiceImpl } from '../../../implementations/authServiceImpl';
import { LoginUserUseCase } from '../../../../application/loginUserUseCase';
import { User } from '../../../persistence/mongoDB/schemas/userSchema';



export async function loginController(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = User.build({
        email: email,
        password: password,
    });

    const userRepository = new MongoUserRepository();
    const authService = new AuthServiceImpl();
    const loginUserUseCase = new LoginUserUseCase(userRepository, authService);

    const loginUserResponse = await loginUserUseCase.run(user);

    const userJwt = authService.generateAuth(loginUserResponse);

    req.session = {
        jwt: userJwt
    };

    res.status(200).send(loginUserResponse);

}