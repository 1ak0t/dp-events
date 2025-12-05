import {BaseControllerAbstract, HttpMethodEnum} from "../../libs/rest/index.js";
import {inject, injectable} from "inversify";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../../libs/logger/index.js";
import {NotificationServiceInterface} from "./notification-service.interface.js";
import {Request, Response} from "express";
import {fillDTO} from "../../helpers/common.js";
import {NotificationRdo} from "./rdo/notification.rdo.js";
import {CreateNotificationRequestType} from "./create-notification-request.type.js";
import {PrivateRouteMiddleware} from "../../libs/rest/middleware/private-route.middleware.js";

@injectable()
export class NotificationController extends BaseControllerAbstract {
    constructor(
        @inject(Component.Logger) protected readonly logger: LoggerInterface,
        @inject(Component.NotificationService) private readonly notificationService: NotificationServiceInterface,
    ) {
        super(logger);

        this.logger.info('Register routes for NotificationController...');

        this.addRoute({
            path: '/',
            method: HttpMethodEnum.Get,
            handler: this.getAll,
            middlewares: [new PrivateRouteMiddleware()]
        });
    }

    public async getAll(_req: Request, res: Response): Promise<void> {
        const notifications = await this.notificationService.find();
        const responseData = fillDTO(NotificationRdo, notifications);
        this.ok(res, responseData);
    }

    public async create(
        {body}: CreateNotificationRequestType,
        res: Response
    ):Promise<void> {
        const result = await this.notificationService.create(body);
        this.created(res, result);
    }
}