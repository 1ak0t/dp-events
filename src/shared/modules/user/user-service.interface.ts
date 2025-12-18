import {CreateUserDto} from "./dto/create-user.dto.js";
import {UserEntity} from "./user.entity.js";
import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {UpdateUserDto} from "./dto/update-user.dto.js";

export interface UserServiceInterface {
    create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
    find(): Promise<DocumentType<UserEntity>[]>;
    findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
    findById(userId: string): Promise<DocumentType<UserEntity> | null>;
    findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
    findByIdAndUpdate(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
    increaseNotificationCount(): void;
    resetNotificationCount(userId: string): void;
    delete(userId: string): Promise<void>;
}