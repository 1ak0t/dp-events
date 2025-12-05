import {BaseControllerAbstract, HttpMethodEnum} from "../../libs/rest/index.js";
import {inject, injectable} from "inversify";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../../libs/logger/index.js";
import {BreakTypeByMachineServiceInterface} from "./break-type-by-machine-service.interface.js";
import {Request, Response} from "express";
import {fillDTO} from "../../helpers/common.js";
import {BreakTypeByMachineRdo} from "./rdo/break-type-by-machine.rdo.js";
import {CreateBreakTypeRequestType} from "./create-break-type-request.type.js";
import {PrivateRouteMiddleware} from "../../libs/rest/middleware/private-route.middleware.js";

@injectable()
export class BreakTypeByMachineController extends BaseControllerAbstract {
    constructor(
        @inject(Component.Logger) protected readonly logger: LoggerInterface,
        @inject(Component.BreakTypeByMachineService) private readonly breakTypeByMachineService: BreakTypeByMachineServiceInterface
    ) {
        super(logger);

        this.logger.info('Register routes for BreakTypeByMachineController...');

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
    }

    public async getAll(_req: Request, res: Response): Promise<void> {
        const breakTypes = await this.breakTypeByMachineService.find();
        const responseData = fillDTO(BreakTypeByMachineRdo, breakTypes);
        this.ok(res, responseData);
    }

    public async create(
        {body} : CreateBreakTypeRequestType,
        res: Response
    ): Promise<void> {
        const result = await this.breakTypeByMachineService.create(body);
        this.created(res, fillDTO(BreakTypeByMachineRdo, result));
    }
}