import { UserEntity } from '../domain/entities/user';
import { UserRepository } from '../domain/repositories/userRepository';
import { EncryptPasswordError } from '../domain/exceptions/encryptPasswordError';
import { NotCreatedUserError } from '../domain/exceptions/notCreatedUserError';
import { AuthService } from '../domain/services/authService';
import { ExistingUserError } from '../domain/exceptions/existingUserError';

export class RegisterUserUseCase {
    private readonly _userRepository: UserRepository;
    private readonly _authService: AuthService;

    constructor(userRepository: UserRepository, authService: AuthService) {
        this._userRepository = userRepository;
        this._authService = authService;
    }

    async run(user: UserEntity): Promise<UserEntity> {
        const encryptResponse = this._authService.encryptPassword(user.password);

        if (!encryptResponse)
            throw new EncryptPasswordError();

        //ISSUE: Add user twices with the same data.
        const existingUser = await this._userRepository.findUserByEmail(user.email);

        if (existingUser)
            throw new ExistingUserError();

        user.password = encryptResponse;
        const addUserResponse = await this._userRepository.addUser(user);

        if (!addUserResponse)
            throw new NotCreatedUserError();

        return addUserResponse;
    }
}