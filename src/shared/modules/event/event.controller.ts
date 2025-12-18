import {inject, injectable} from "inversify";
import {BaseControllerAbstract, HttpMethodEnum} from "../../libs/rest/index.js";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../../libs/logger/index.js";
import {EventServiceInterface} from "./event-service.interface.js";
import {Request, Response} from "express";
import {fillDTO} from "../../helpers/common.js";
import {EventRdo} from "./rdo/event.rdo.js";
import {CreateEventRequestType, SuccessWarningEventRequestType} from "./create-event-request.type.js";
import {PrivateRouteMiddleware} from "../../libs/rest/middleware/private-route.middleware.js";

@injectable()
export class EventController extends BaseControllerAbstract {
    constructor(
        @inject(Component.Logger) protected readonly logger: LoggerInterface,
        @inject(Component.EventService) protected readonly eventService: EventServiceInterface
    ) {
        super(logger);

        this.logger.info('Register routes for EventController...');

        this.addRoute({
            path: '/',
            method: HttpMethodEnum.Get,
            handler: this.getAll,
            middlewares: [new PrivateRouteMiddleware()]
        });
        this.addRoute({
            path: '/',
            method: HttpMethodEnum.Post,
            handler: this.create,
            middlewares: [new PrivateRouteMiddleware()]
        });
        this.addRoute({
            path: '/success-warning',
            method: HttpMethodEnum.Patch,
            handler: this.successWarning,
            middlewares: [new PrivateRouteMiddleware()]
        });
    }

    public async getAll(_req: Request, res: Response): Promise<void> {
        const events = await this.eventService.findAll();
        const responseData = fillDTO(EventRdo, events);
        this.ok(res, responseData);
    }

    public async create(
        {body}: CreateEventRequestType,
        res: Response
    ): Promise<void> {
        const result = await this.eventService.create(body);
        this.created(res, fillDTO(EventRdo, result));
    }

    public async successWarning(
        {body}: SuccessWarningEventRequestType,
        res: Response
    ): Promise<void> {
        const {userId, eventId} = body;
        const result = await this.eventService.findByIdAndUpdateReadPerson(userId, eventId);
        this.created(res, fillDTO(EventRdo, result));
    }
}