import { UserEntity } from '../domain/entities/user';
import { UserRepository } from '../domain/repositories/userRepository';
import { AuthService } from '../domain/services/authService';
import { CredentialUserError } from '../domain/exceptions/credentialUserError';


export class LoginUserUseCase {
    private readonly _userRepository: UserRepository;
    private readonly _authService: AuthService;

    constructor(userRepository: UserRepository, authService: AuthService) {
        this._userRepository = userRepository;
        this._authService = authService;
    }

    async run(user: UserEntity): Promise<UserEntity> {
        const existingUser = await this._userRepository.findUserByEmail(user.email);

        if (!existingUser)
            throw new CredentialUserError();

        const passwordsMatch = this._authService.comparePassword(user.password, existingUser.password);

        if (!passwordsMatch)
            throw new CredentialUserError();

        return existingUser;
    }
}