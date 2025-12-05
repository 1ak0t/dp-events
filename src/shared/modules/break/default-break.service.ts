import {inject, injectable} from "inversify";
import {BreakServiceInterface} from "./break-service.interface.js";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../../libs/logger/index.js";
import {types} from "@typegoose/typegoose";
import {CreateBreakDto} from "./dto/create-break.dto.js";
import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {BreakEntity} from "./break.entity.js";
import {UpdateBreakDto} from "./dto/update-break.dto.js";
import {MachinesStatus} from "../../types/machine.type.js";
import {MachineServiceInterface} from "../machine/machine-service.interface.js";
import pkg from 'web-push';
import {getMachineStatusByPriority} from "../../helpers/common.js";
import {SubscriptionServiceInterface} from "../subscription/subscription-service.interface.js";
import {NotificationServiceInterface} from "../notification/notification-service.interface.js";
import {CreateNotificationDto} from "../notification/dto/create-notification.dto.js";
import {UserServiceInterface} from "../user/user-service.interface.js";
import {globalEmitter} from "../../../main.rest.js";
import {UserRoles} from "../../types/user.type.js";

const { sendNotification } = pkg;

@injectable()
export class DefaultBreakService implements BreakServiceInterface {
    constructor(
        @inject(Component.Logger) private readonly logger: LoggerInterface,
        @inject(Component.BreakModel) private readonly breakModel: types.ModelType<BreakEntity>,
        @inject(Component.MachineService) private readonly machineService: MachineServiceInterface,
        @inject(Component.SubscriptionService) private readonly subscriptionService: SubscriptionServiceInterface,
        @inject(Component.NotificationService) private readonly notificationService: NotificationServiceInterface,
        @inject(Component.UserService) private readonly userService: UserServiceInterface
    ) {
    }

    public async create(dto: CreateBreakDto): Promise<DocumentType<BreakEntity>> {
        const result = (await this.breakModel.create(dto)).populate([
            'machine',
            'registerPerson',
            'successPerson',
            'repairingPerson',
            'repairCompletedPerson'
        ]);
        this.logger.info(`New break register: ${dto.breakName}, ${dto.registerPerson}`);


        const machine = await this.machineService.findById(dto.machine);
        const rolesForSubs = [
            UserRoles.CEO,
            UserRoles.ITR,
            UserRoles.Admin,
            UserRoles.Engineers,
            UserRoles.HeadEngineer,
            UserRoles.Operator
        ];

        const subscriptions = await this.subscriptionService.getAll(rolesForSubs);

        const notificationObj = {
            title: `Новая поломка оборудования - ${machine?.name}`,
            text: `Поломка: ${dto.breakName}\nПриоритет: ${getMachineStatusByPriority(dto.priority)}`,
            img: '/icons/icon-72x72.png'
        }

        await this.notificationService.create(notificationObj);
        this.userService.increaseNotificationCount();

        if (subscriptions) {
            subscriptions.map(sub => {
                sendNotification(sub, JSON.stringify(notificationObj)).catch(e => this.logger.info(e));
            })
        }

        return result;
    }

    public async find(): Promise<DocumentType<BreakEntity>[]> {
        return this.breakModel.find()
            .populate([
                'machine',
                'registerPerson',
                'successPerson',
                'repairingPerson',
                'repairCompletedPerson',
                'repairEndPerson'
            ])
            .exec();
    }

    public async updateById(breakId: string, dto: UpdateBreakDto): Promise<DocumentType<BreakEntity> | null> {
        const breaksByMachine = await this.breakModel.find({machine: dto.machine, status: false}).countDocuments();

        if (dto.status && (breaksByMachine - 1) === 0 && dto.machine) {
            await this.machineService.updateById(dto.machine, {status: MachinesStatus.Work});
        }

        const updateById = await this.breakModel
            .findByIdAndUpdate(breakId, dto, {new: true})
            .populate([
                'machine',
                'registerPerson',
                'successPerson',
                'repairingPerson',
                'repairCompletedPerson'
            ])
            .exec();

        if(dto.machine) {
            const machine = await this.machineService.findById(dto.machine);
            const rolesForSubs = [
                UserRoles.CEO,
                UserRoles.ITR,
                UserRoles.Admin,
                UserRoles.Engineers,
                UserRoles.HeadEngineer,
                UserRoles.Operator
            ];

            const subscriptions = await this.subscriptionService.getAll(rolesForSubs);

            let notificationObj = {};

            if (updateById?.stages !== null) {
                notificationObj = {
                    title: `Изменен статус поломки - ${machine?.name}`,
                    text: `Поломка: ${updateById?.breakName}\nНовый статус: ${updateById?.stages}`,
                    img: '/icons/icon-72x72.png'
                }
            } else {
                notificationObj = {
                    title: `Ремонт поломки выполнен - ${machine?.name}`,
                    text: `Поломка: ${updateById?.breakName}\nНовый статус: Завершен`,
                    img: '/icons/icon-72x72.png'
                }
            }

            await this.notificationService.create(notificationObj as CreateNotificationDto);

            this.userService.increaseNotificationCount();

            globalEmitter.emit('update', 'Update');

            if (subscriptions) {
                subscriptions.map(sub => {
                    sendNotification(sub, JSON.stringify(notificationObj)).catch(e => this.logger.info(e));
                })
            }
        }

        return updateById;
    }

    public deleteById(breakId: string): Promise<DocumentType<BreakEntity> | null> {

        return this.breakModel
            .findByIdAndDelete(breakId)
            .exec()
    }
}
