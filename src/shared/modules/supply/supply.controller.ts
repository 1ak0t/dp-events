import {inject, injectable} from "inversify";
import {BaseControllerAbstract, HttpError, HttpMethodEnum} from "../../libs/rest/index.js";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../../libs/logger/index.js";
import {SupplyServiceInterface} from "./supply-service.interface.js";
import {Request, Response} from "express";
import {CreateSupplyRequestType} from "./create-supply-request.type.js";
import {fillDTO} from "../../helpers/common.js";
import {SupplyRdo} from "./rdo/supply.rdo.js";
import {ParamBreakIdSupplyType} from "./types/param-supply.type.js";
import {ChangeSupplyStatusDto} from "./dto/changeSupplyStatus.dto.js";
import {StatusCodes} from "http-status-codes";
import {UploadFileMiddleware} from "../../libs/rest/middleware/upload-file.middleware.js";
import {ConfigInterface} from "../../libs/config/index.js";
import {RestSchema} from "../../libs/config/rest.schema.js";

@injectable()
export class SupplyController extends BaseControllerAbstract {
    constructor(
        @inject(Component.Logger) protected readonly logger: LoggerInterface,
        @inject(Component.SupplyService) private readonly supplyService: SupplyServiceInterface,
        @inject(Component.Config) private readonly configService: ConfigInterface<RestSchema>,
    ) {
        super(logger);

        this.logger.info('Register routes for SupplyController...');

        this.addRoute({
            path: '/',
            method: HttpMethodEnum.Post,
            handler: this.create,
        });
        this.addRoute({
            path: '/',
            method: HttpMethodEnum.Get,
            handler: this.getAll
        });
        this.addRoute({
            path: '/:supplyId/change-status',
            method: HttpMethodEnum.Patch,
            handler: this.changeSupplyStatus,
            middlewares: [
                new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
            ]
        });
        this.addRoute({
            path: '/:supplyId/find-by-break',
            method: HttpMethodEnum.Get,
            handler: this.findByBreakId
        })
    }

    public async create(
        {body}: CreateSupplyRequestType,
        res: Response
    ): Promise<void> {
        const result = await this.supplyService.create(body);
        this.created(res, fillDTO(SupplyRdo, result));
    }

    public async getAll(_req: Request, res: Response): Promise<void> {
        const supplies = await this.supplyService.getAll();
        this.ok(res, fillDTO(SupplyRdo, supplies));
    }

    public async changeSupplyStatus({body, params, file}: Request<ParamBreakIdSupplyType, unknown, ChangeSupplyStatusDto>, res: Response) {
        if (file) {
            const updateDto = {...body, supplyImage: file.filename};
            const changedSupply = await this.supplyService.changeSupplyStatus(params.supplyId, updateDto);
            if (!changedSupply) {
                throw new HttpError(
                    StatusCodes.NOT_FOUND,
                    `Supply with id ${params.supplyId} not found.`,
                    'SupplyController'
                );
            }

            this.ok(res, fillDTO(SupplyRdo, changedSupply));
        } else {
            const changedSupply = await this.supplyService.changeSupplyStatus(params.supplyId, body);

            if (!changedSupply) {
                throw new HttpError(
                    StatusCodes.NOT_FOUND,
                    `Supply with id ${params.supplyId} not found.`,
                    'SupplyController'
                );
            }

            this.ok(res, fillDTO(SupplyRdo, changedSupply));
        }
    }

    public async findByBreakId({params}: Request<ParamBreakIdSupplyType>, res: Response) {
        const {supplyId} = params;
        const supplies = await this.supplyService.findByBreak(supplyId);

        if (!supplies) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `Supplyes with break id ${supplyId} not found.`,
                'SupplyController'
            );
        }

        this.ok(res, fillDTO(SupplyRdo, supplies))
    }
}