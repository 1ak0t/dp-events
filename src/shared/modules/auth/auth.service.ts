import {inject, injectable} from "inversify";
import {AuthServiceInterface} from "./auth-service.interface.js";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../../libs/logger/index.js";
import {UserServiceInterface} from "../user/user-service.interface.js";
import {Config} from "convict";
import {RestSchema} from "../../libs/config/rest.schema.js";
import {UserEntity} from "../user/index.js";
import * as crypto from "crypto";
import {TokenPayload} from "./types/tokenPayload.js";
import {SignJWT} from "jose";
import {JWT_ALGORITHM, JWT_EXPIRED} from "./auth.constant.js";
import {LoginUserDto} from "../user/dto/login-user.dto.js";
import {UserNotFoundException} from "./errors/user-not-found.exception.js";
import {UserPasswordIncorrectException} from "./errors/user-password-incorrect.exception.js";

@injectable()
export class AuthService implements AuthServiceInterface {
    constructor(
        @inject(Component.Logger) private readonly logger: LoggerInterface,
        @inject(Component.UserService) private readonly userService: UserServiceInterface,
        @inject(Component.Config) private readonly config: Config<RestSchema>
    ) {
    }

    public async authenticate(user: UserEntity): Promise<string> {
        const jwtSecret = this.config.get('JWT_SECRET');
        const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
        const tokenPayload: TokenPayload = {
            email: user.email,
            surname: user.surname,
            name: user.name,
            id: user.id
        }

        this.logger.info(`Create token for ${user.email}`);
        return new SignJWT(tokenPayload)
            .setProtectedHeader({alg: JWT_ALGORITHM})
            .setIssuedAt()
            .setExpirationTime(JWT_EXPIRED)
            .sign(secretKey);
    }

    public async verify(dto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) {
            this.logger.warn(`User with ${dto.email} not found`);
            throw new UserNotFoundException();
        }

        if (!user.verifyPassword(dto.password, this.config.get('SALT'))) {
            this.logger.warn(`Incorrect password for ${dto.email}`);
            throw new UserPasswordIncorrectException();
        }

        return user;
    }
}