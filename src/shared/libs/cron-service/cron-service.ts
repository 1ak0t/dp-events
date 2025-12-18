import {inject, injectable} from "inversify";
import {CronServiceInterface} from "./cron-service.interface.js";
import nodeCron from "node-cron";
import {Component} from "../../types/index.js";
import {NodemailerInterface} from "../nodemailer/nodemailer.interface.js";
import {LoggerInterface} from "../logger/index.js";
import {logger} from "@typegoose/typegoose/lib/logSettings.js";
import dayjs from "dayjs";
import {UserServiceInterface} from "../../modules/user/user-service.interface.js";
import {EventServiceInterface} from "../../modules/event/event-service.interface.js";
import {Types} from "mongoose";
import {EventStatuses} from "../../types/event.type.js";

@injectable()
export class CronService implements CronServiceInterface{
    constructor(
        @inject(Component.NodemailerService) private readonly nodeMailer: NodemailerInterface,
        @inject(Component.Logger) private readonly logger: LoggerInterface,
        @inject(Component.UserService) private readonly userService: UserServiceInterface,
        @inject(Component.EventService) private readonly eventService: EventServiceInterface,
    ) {
    }

    public async addMailSend(recipients: string[], title: string, htmlBody: string, text: string): Promise<void> {
        logger.info('Planed to send email by creating event ', title);
        const task = nodeCron.schedule('10 * * * * *', async () => {
            await this.nodeMailer.sendEmail(recipients, title, htmlBody, text);
        }, {
            maxExecutions: 1
        });

        task.on('execution:finished', (ctx) => {
            this.logger.info(`Execution ${title} finished. Result:`, ctx.execution?.result);
        });

        task.start();
    }

    public async checkEveryDayDeadLines(): Promise<void> {
        const events = await this.eventService.findAll();
        const users = await this.userService.find();
        const recipients: string[] = [];
        users.map(user => {
            recipients.push(user.email);
        })
        events.map(event => {
            const dayLost = dayjs(event.deadLine).diff(dayjs(), 'days')+1;
            let emailHTMLBody = '';
            const confirmLink = `<a href=\"http://localhost:3000/success-warning/${event.id}\">Перейдите по ссылке для подтверждения об ознакомлении</a>`
            console.log(dayLost)
            if (!(event.mainPerson instanceof Types.ObjectId) && !(event.createPerson instanceof Types.ObjectId)) {
                emailHTMLBody = `<h1>${event.name} ${event.jobName} - до конца срока ${dayLost} дней!</h1>
                                <p><b>Нименование работ: </b>${event.name}</p>
                                <p><b>Нименование ключевого события: </b>${event.jobName}</p>
                                <p><b>Срок достижения: </b>${event.deadLine}</p>
                                <p><b>Отчетная документация: </b>${event.documents}</p>
                                <p><b>Ответственный: </b>${event.mainPerson.surname} ${event.mainPerson.name}</p>
                                <p><b>Автор: </b>${event.createPerson.surname} ${event.createPerson.name}</p>`;
            }
            if (dayLost <= 45 && dayLost > 30) {
                this.eventService.findByIdAndUpdateStatus(event.id, EventStatuses.Attention);
            }
            if (dayLost <= 30 && dayLost > 15) {
                this.eventService.findByIdAndUpdateStatus(event.id, EventStatuses.Warning);
            }
            if (dayLost <= 15) {
                this.eventService.findByIdAndUpdateStatus(event.id, EventStatuses.Critical);
            }
            if ((dayLost === 45 || dayLost === 30 || dayLost <= 15) && emailHTMLBody !== '') {
                if (dayLost === 30) {
                    this.addMailSend(['i.kot@detail-project.ru'], `${event.name} ${event.jobName} - до конца срока ${dayLost} дней!`, emailHTMLBody+confirmLink, `${event.name} ${event.jobName} - до конца срока ${dayLost} дней!`);
                } else {
                    this.addMailSend(['i.kot@detail-project.ru'], `${event.name} ${event.jobName} - до конца срока ${dayLost} дней!`, emailHTMLBody, `${event.name} ${event.jobName} - до конца срока ${dayLost} дней!`);
                }
            }
        })
    }
}