import {inject, injectable} from "inversify";
import {SupplyServiceInterface} from "./supply-service.interface.js";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../../libs/logger/index.js";
import {types} from "@typegoose/typegoose";
import {SupplyEntity} from "./supply.entity.js";
import {CreateSupplyDto} from "./dto/create-supply.dto.js";
import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {ChangeSupplyStatusDto} from "./dto/changeSupplyStatus.dto.js";
import {UserRoles} from "../../types/user.type.js";
import {CreateNotificationDto} from "../notification/dto/create-notification.dto.js";
import {globalEmitter} from "../../../main.rest.js";
import {SubscriptionServiceInterface} from "../subscription/subscription-service.interface.js";
import {NotificationServiceInterface} from "../notification/notification-service.interface.js";
import {UserServiceInterface} from "../user/user-service.interface.js";
import pkg from 'web-push';
const { sendNotification } = pkg;

@injectable()
export class SupplyService implements SupplyServiceInterface{
    constructor(
        @inject(Component.Logger) private readonly logger: LoggerInterface,
        @inject(Component.SupplyModel) private readonly supplyModel: types.ModelType<SupplyEntity>,
        @inject(Component.SubscriptionService) private readonly subscriptionService: SubscriptionServiceInterface,
        @inject(Component.NotificationService) private readonly notificationService: NotificationServiceInterface,
        @inject(Component.UserService) private readonly userService: UserServiceInterface
    ) {
    }

    public async create(dto: CreateSupplyDto): Promise<DocumentType<SupplyEntity>> {
        const result = (await this.supplyModel.create(dto)).populate(['break']);
        this.logger.info(`New supply by break ${dto.break} created successfully.`);

        const rolesForSubs = [
            UserRoles.Supply
        ];

        const subscriptions = await this.subscriptionService.getAll(rolesForSubs);

        const notificationObj = {
            title: `Запрошено снабжение`,
            text: `${dto.supplyTitle}`,
            img: '/icons/icon-72x72.png'
        }

        await this.notificationService.create({...notificationObj, roles: [UserRoles.Supply]} as CreateNotificationDto);

        this.userService.increaseNotificationCount();

        globalEmitter.emit('update', 'Update');

        if (subscriptions) {
            subscriptions.map(sub => {
                sendNotification(sub, JSON.stringify(notificationObj)).catch(e => this.logger.info(e));
            })
        }

        return result;
    }

    public async getAll(): Promise<DocumentType<SupplyEntity>[]> {
        const data = await this.supplyModel.find().populate(['break']).exec();
        return data;
    }

    public async findByBreak(breakId: string): Promise<DocumentType<SupplyEntity>[]> {
        const result = await this.supplyModel.find({break: breakId}).populate(['break']).exec();
        return result;
    }

    public async changeSupplyStatus(supplyId: string, dto: ChangeSupplyStatusDto): Promise<DocumentType<SupplyEntity> | null> {
        const result = await this.supplyModel.findByIdAndUpdate(supplyId, dto, { new: true })
            .populate(['break'])
            .exec();

        return result;
    }
}