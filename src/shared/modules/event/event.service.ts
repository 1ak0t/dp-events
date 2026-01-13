import {inject, injectable} from "inversify";
import {EventServiceInterface} from "./event-service.interface.js";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../../libs/logger/index.js";
import {CreateEventDto} from "./dto/create-event.dto.js";
import {EventEntity} from "./event.entity.js";
import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {types} from "@typegoose/typegoose";
import {EventStatuses} from "../../types/event.type.js";
import {UserServiceInterface} from "../user/user-service.interface.js";
import {UpdateEventDto} from "./dto/update-event.dto.js";
// import {CronServiceInterface} from "../../libs/cron-service/cron-service.interface.js";

@injectable()
export class EventService implements EventServiceInterface {
    constructor(
        @inject(Component.Logger) private readonly logger: LoggerInterface,
        @inject(Component.EventModel) private readonly eventModel: types.ModelType<EventEntity>,
        // @inject(Component.CronService) private readonly cronService: CronServiceInterface,
        @inject(Component.UserService) private readonly userService: UserServiceInterface
    ) {
    }

    public async create(dto: CreateEventDto): Promise<DocumentType<EventEntity>> {
        const result = (await this.eventModel.create(dto)).populate([
            'mainPerson',
            'readPerson',
            'completedPerson',
            'createPerson',
        ])
        this.logger.info(`New event created: ${dto.jobName}`);
        // const user = await this.userService.findById(dto.createPerson);
        //
        // const emailHTMLBody = `<h1>Новое ключевое событие - ${dto.jobName}</h1>
        //                         <p><b>Нименование работ: </b>${dto.name}</p>
        //                         <p><b>Нименование ключевого события: </b>${dto.jobName}</p>
        //                         <p><b>Срок достижения: </b>${dto.deadLine}</p>
        //                         <p><b>Отчетная документация: </b>${dto.documents}</p>
        //                         <p><b>Автор: </b>${user?.name} ${user?.surname}</p>`
        // await this.cronService.addMailSend(['i.kot@detail-project.ru'], dto.jobName, emailHTMLBody, dto.jobName);

        return result;
    }

    public async findAll(): Promise<DocumentType<EventEntity>[]> {
        return this.eventModel.find().populate([
            'mainPerson',
            'readPerson',
            'completedPerson',
            'createPerson',
        ])
    }

    public async findByIdAndUpdateStatus(id: string, status: EventStatuses): Promise<DocumentType<EventEntity> | null> {
        return this.eventModel.findByIdAndUpdate(id, {status: status}, {new: true});
    }

    public async findById(eventId: string): Promise<DocumentType<EventEntity> | null> {
        return this.eventModel.findById(eventId);
    }

    public async delete(eventId: string): Promise<void> {
        await this.eventModel.findByIdAndDelete(eventId);
    }

    public async findByIdAndUpdateReadPerson(userId: string, eventId: string): Promise<DocumentType<EventEntity> | null> {
        const event = await this.eventModel.findById(eventId).populate([
            'mainPerson',
            'readPerson',
            'completedPerson',
            'createPerson',
        ]);
        if (event !== null) {
            console.log(event.readPerson);
            let currentReadPerson: any = [];
            if (event.readPerson !== null) {
                currentReadPerson = event.readPerson;
            }
            const user = await this.userService.findById(userId);
            if (user !== null && event.readPerson !== null) {
                currentReadPerson.push(user);
            }

            // const result = await this.eventModel.updateOne({ id: eventId }, { $push: { fans: { $each: [userId] } } }).populate([
            //     'mainPerson',
            //     'readPerson',
            //     'completedPerson',
            //     'createPerson',
            // ])
            return event;
        }
        return null;
    }

    public async updateById(eventId: string, dto: UpdateEventDto): Promise<DocumentType<EventEntity> | null> {
        const update = await this.eventModel.findByIdAndUpdate(eventId, dto).populate([
            'mainPerson',
            'readPerson',
            'completedPerson',
            'createPerson',
        ]).exec();
        return update;
    }
}