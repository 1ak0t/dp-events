import {inject, injectable} from "inversify";
import {BaseControllerAbstract, HttpError, HttpMethodEnum} from "../../libs/rest/index.js";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../../libs/logger/index.js";
import {EventServiceInterface} from "./event-service.interface.js";
import {Request, Response} from "express";
import {fillDTO} from "../../helpers/common.js";
import {EventRdo} from "./rdo/event.rdo.js";
import {CreateEventRequestType, SuccessWarningEventRequestType} from "./create-event-request.type.js";
import {PrivateRouteMiddleware} from "../../libs/rest/middleware/private-route.middleware.js";
import {StatusCodes} from "http-status-codes";
import {ParamEventIdType, ParamEventType} from "./types/param-event.type.js";
import {UploadRepairCompletedImageRdo} from "../break/rdo/upload-repair-completed-image-rdo.js";
import {BreakRdo} from "../break/rdo/break.rdo.js";
import {UpdateEventDto} from "./dto/update-event.dto.js";
import {ValidateObjectidMiddleware} from "../../libs/rest/middleware/validate-objectid.middleware.js";
import {UploadFileMiddleware} from "../../libs/rest/middleware/upload-file.middleware.js";
import {ConfigInterface} from "../../libs/config/index.js";
import {RestSchema} from "../../libs/config/rest.schema.js";

@injectable()
export class EventController extends BaseControllerAbstract {
    constructor(
        @inject(Component.Logger) protected readonly logger: LoggerInterface,
        @inject(Component.EventService) protected readonly eventService: EventServiceInterface,
        @inject(Component.Config) private readonly configService: ConfigInterface<RestSchema>,
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
        this.addRoute({
            path: '/:eventId/delete',
            method: HttpMethodEnum.Delete,
            handler: this.deleteEvent,
            middlewares: [new PrivateRouteMiddleware()]
        });
        this.addRoute({
            path: '/:eventId',
            method: HttpMethodEnum.Patch,
            handler: this.update,
            middlewares: [new ValidateObjectidMiddleware('eventId'), new PrivateRouteMiddleware()]
        });
        this.addRoute({
            path: '/:eventId/completed-image',
            method: HttpMethodEnum.Post,
            handler: this.updateEventImageById,
            middlewares: [
                new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
                new ValidateObjectidMiddleware('eventId'),
                new PrivateRouteMiddleware()
            ]
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

    public async deleteEvent(
        {params}: Request<ParamEventType, unknown, unknown>,
        res: Response,
    ): Promise<void> {
        if (params.eventId) {
            const event = await this.eventService.findById(params.eventId);
            if (event){
                await this.eventService.delete(event.id);
                this.ok(res, "Event deleted");
            }
        } else {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                'Событие не найдено',
                'EventController'
            );
        }
    }

    public async updateEventImageById({ params, file } : Request<ParamEventIdType>, res: Response) {
        const { eventId } = params;
        const updateDto = { completedFile: file?.filename };
        await this.eventService.updateById(eventId, updateDto);
        this.created(res, fillDTO(UploadRepairCompletedImageRdo, updateDto));
    }

    public async update({body, params}: Request<ParamEventIdType, unknown, UpdateEventDto>, res: Response): Promise<void> {
        const updatedEvent = await this.eventService.updateById(params.eventId, body);

        if (!updatedEvent) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `Event with id ${params.eventId} not found.`,
                'EventController'
            );
        }

        this.ok(res, fillDTO(BreakRdo, updatedEvent));
    }
}