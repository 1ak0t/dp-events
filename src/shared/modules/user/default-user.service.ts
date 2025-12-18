import {UserServiceInterface} from "./user-service.interface.js";
import {CreateUserDto} from "./dto/create-user.dto.js";
import {UserEntity} from "./user.entity.js";
import {inject, injectable} from "inversify";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../../libs/logger/index.js";
import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {types} from "@typegoose/typegoose";
import {UpdateUserDto} from "./dto/update-user.dto.js";

@injectable()
export class DefaultUserService implements UserServiceInterface {
    constructor(
        @inject(Component.Logger) private readonly logger: LoggerInterface,
        @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
    ) {
    }
    public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
        const user = new UserEntity(dto);
        user.setPassword(dto.password, salt);

        const result = await this.userModel.create(user);
        this.logger.info(`New user created: ${user.email}`);

        return result;
    }

    public async find(): Promise<DocumentType<UserEntity>[]> {
        const users = this.userModel.find();
        return users;
    }

    public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
        return this.userModel.findById(userId);
    }

    public async findByEmail(email:string): Promise<DocumentType<UserEntity> | null> {
        return this.userModel.findOne({email});
    }

    public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
        const existedUser = await this.findByEmail(dto.email);

        if (existedUser) {
            return existedUser;
        }

        return this.create(dto, salt);
    }

    public async delete(userId:string): Promise<void> {
       await this.userModel.findByIdAndDelete(userId);
    }

    public async findByIdAndUpdate(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
        return this.userModel.findByIdAndUpdate(userId, dto, {new: true});
    }

    public async increaseNotificationCount() {
        const users = await this.userModel.find().exec();
        users.map(user => {
            if (user.notificationsCount !== undefined) {
                this.findByIdAndUpdate(user.id, {notificationsCount: user.notificationsCount + 1});
            } else {
                this.findByIdAndUpdate(user.id, {notificationsCount: 1});
            }
        })
    }

    public async resetNotificationCount(userId: string) {
        const user = await this.userModel.findById(userId);
        if (user) {
            await this.findByIdAndUpdate(user.id, {notificationsCount: 0});
        }
    }
}