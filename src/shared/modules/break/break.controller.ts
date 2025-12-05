import {BaseControllerAbstract, HttpError, HttpMethodEnum} from "../../libs/rest/index.js";
import {inject, injectable} from "inversify";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../../libs/logger/index.js";
import {BreakServiceInterface} from "./break-service.interface.js";
import {Request, Response} from "express";
import {fillDTO} from "../../helpers/common.js";
import {BreakRdo} from "./rdo/break.rdo.js";
import {CreateBreakRequestType} from "./create-break-request.type.js";
import {StatusCodes} from "http-status-codes";
import {ParamBreakIdType} from "./types/parem-break.type.js";
import {UpdateBreakDto} from "./dto/update-break.dto.js";
import {UploadFileMiddleware} from "../../libs/rest/middleware/upload-file.middleware.js";
import {ConfigInterface} from "../../libs/config/index.js";
import {RestSchema} from "../../libs/config/rest.schema.js";
import {UploadSuccessImageRdo} from "./rdo/upload-success-image-rdo.js";
import {UploadRegisterImageRdo} from "./rdo/upload-register-image-rdo.js";
import {UploadRepairingImageRdo} from "./rdo/upload-repairing-image-rdo.js";
import {UploadRepairCompletedImageRdo} from "./rdo/upload-repair-completed-image-rdo.js";
import {ValidateObjectidMiddleware} from "../../libs/rest/middleware/validate-objectid.middleware.js";
import {PrivateRouteMiddleware} from "../../libs/rest/middleware/private-route.middleware.js";

@injectable()
export class BreakController extends BaseControllerAbstract {
    constructor(
        @inject(Component.Logger) protected readonly logger: LoggerInterface,
        @inject(Component.BreakService) private readonly breakService: BreakServiceInterface,
        @inject(Component.Config) private readonly configService: ConfigInterface<RestSchema>
    ) {
        super(logger);

        this.logger.info('Register routes for BreakController...');

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
            path: '/:breakId',
            method: HttpMethodEnum.Patch,
            handler: this.update,
            middlewares: [new ValidateObjectidMiddleware('breakId'), new PrivateRouteMiddleware()]
        });
        this.addRoute({
            path: '/:breakId',
            method: HttpMethodEnum.Delete,
            handler: this.delete,
            middlewares: [new ValidateObjectidMiddleware('breakId'), new PrivateRouteMiddleware()]
        });
        this.addRoute({
            path: '/:breakId/success-image',
            method: HttpMethodEnum.Post,
            handler: this.uploadSuccessImage,
            middlewares: [
                new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
                new ValidateObjectidMiddleware('breakId'),
                new PrivateRouteMiddleware()
            ]
        });
        this.addRoute({
            path: '/:breakId/register-image',
            method: HttpMethodEnum.Post,
            handler: this.uploadRegisterImage,
            middlewares: [
                new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
                new ValidateObjectidMiddleware('breakId'),
                new PrivateRouteMiddleware()
            ]
        });
        this.addRoute({
            path: '/:breakId/repairing-image',
            method: HttpMethodEnum.Post,
            handler: this.uploadRepairingImage,
            middlewares: [
                new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
                new ValidateObjectidMiddleware('breakId'),
                new PrivateRouteMiddleware()
            ]
        });
        this.addRoute({
            path: '/:breakId/repair-completed-image',
            method: HttpMethodEnum.Post,
            handler: this.uploadRepairCompletedImage,
            middlewares: [
                new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
                new ValidateObjectidMiddleware('breakId'),
                new PrivateRouteMiddleware()
            ]
        });
    }

    public async getAll(_req: Request, res: Response): Promise<void> {
        const breaks = await this.breakService.find();
        const responseData = fillDTO(BreakRdo, breaks);
        this.ok(res, responseData);
    }

    public async create(
        {body}: CreateBreakRequestType,
        res: Response
    ): Promise<void> {
        const result = await this.breakService.create(body);
        this.created(res, fillDTO(BreakRdo, result));
    }

    public async update({body, params}: Request<ParamBreakIdType, unknown, UpdateBreakDto>, res: Response): Promise<void> {
        const updatedBreak = await this.breakService.updateById(params.breakId, body);

        if (!updatedBreak) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `Offer with id ${params.breakId} not found.`,
                'OfferController'
            );
        }

        this.ok(res, fillDTO(BreakRdo, updatedBreak));
    }

    public async delete({params}: Request<ParamBreakIdType>, res: Response): Promise<void> {
        const {breakId} = params;
        const breaks = await this.breakService.deleteById(breakId);

        if (!breaks) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `Offer with id ${breakId} not found.`,
                'OfferController'
            );
        }

        this.noContent(res, breaks)
    }

    public async uploadSuccessImage({ params, file } : Request<ParamBreakIdType>, res: Response) {
        const { breakId } = params;
        const updateDto = { successImage: file?.filename };
        await this.breakService.updateById(breakId, updateDto);
        this.created(res, fillDTO(UploadSuccessImageRdo, updateDto));
    }

    public async uploadRegisterImage({ params, file } : Request<ParamBreakIdType>, res: Response) {
        const { breakId } = params;
        const updateDto = { registerImage: file?.filename };
        await this.breakService.updateById(breakId, updateDto);
        this.created(res, fillDTO(UploadRegisterImageRdo, updateDto));
    }

    public async uploadRepairingImage({ params, file } : Request<ParamBreakIdType>, res: Response) {
        const { breakId } = params;
        const updateDto = { repairingImage: file?.filename };
        await this.breakService.updateById(breakId, updateDto);
        this.created(res, fillDTO(UploadRepairingImageRdo, updateDto));
    }

    public async uploadRepairCompletedImage({ params, file } : Request<ParamBreakIdType>, res: Response) {
        const { breakId } = params;
        const updateDto = { repairCompletedImage: file?.filename };
        await this.breakService.updateById(breakId, updateDto);
        this.created(res, fillDTO(UploadRepairCompletedImageRdo, updateDto));
    }
}