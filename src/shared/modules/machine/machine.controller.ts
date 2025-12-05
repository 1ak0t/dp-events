import {inject, injectable} from "inversify";
import {BaseControllerAbstract, HttpError, HttpMethodEnum} from "../../libs/rest/index.js";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../../libs/logger/index.js";
import {MachineServiceInterface} from "./machine-service.interface.js";
import {Request, Response} from "express";
import {fillDTO} from "../../helpers/common.js";
import {MachineRdo} from "./rdo/machine.rdo.js";
import {CreateMachineRequestType} from "./create-machine-request.type.js";
import {ParamMachineidType} from "./type/param-machineid.type.js";
import {UpdateMachineDto} from "./dto/update-machine.dto.js";
import {StatusCodes} from "http-status-codes";
import {ValidateObjectidMiddleware} from "../../libs/rest/middleware/validate-objectid.middleware.js";
import {PrivateRouteMiddleware} from "../../libs/rest/middleware/private-route.middleware.js";

@injectable()
export class MachineController extends BaseControllerAbstract {
    constructor(
        @inject(Component.Logger) protected readonly logger: LoggerInterface,
        @inject(Component.MachineService) private readonly machineService: MachineServiceInterface
    ) {
        super(logger);

        this.logger.info('Register routes for MachineController...');

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
            path: '/:machineId',
            method: HttpMethodEnum.Patch,
            handler: this.update,
            middlewares: [new ValidateObjectidMiddleware('machineId'), new PrivateRouteMiddleware()]
        });
        this.addRoute({
            path: '/:machineId',
            method: HttpMethodEnum.Get,
            handler: this.findById,
            middlewares: [new ValidateObjectidMiddleware('machineId'), new PrivateRouteMiddleware()]
        });
    }

    public async getAll(_req: Request, res: Response): Promise<void> {
        const machines = await this.machineService.find();
        const responseData = fillDTO(MachineRdo, machines);
        this.ok(res, responseData);
    }

    public async create(
        {body} : CreateMachineRequestType,
        res: Response
    ): Promise<void> {
        const result = await this.machineService.create(body);
        this.created(res, fillDTO(MachineRdo, result));
    }

    public async update({body, params}: Request<ParamMachineidType, unknown, UpdateMachineDto>, res: Response): Promise<void> {
        const updatedMachine = await this.machineService.updateById(params.machineId, body);

        if (!updatedMachine) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `Offer with id ${params.machineId} not found.`,
                'MachineController'
            );
        }

        this.ok(res, fillDTO(MachineRdo, updatedMachine));
    }

    public async findById({params}: Request<ParamMachineidType>, res: Response): Promise<void> {
        const {machineId} = params;
        const machine = await this.machineService.findById(machineId);

        if (!machine) {
            throw new HttpError(
                StatusCodes.NOT_FOUND,
                `Machine with id ${machineId} not found.`,
                'MachineController'
            );
        }

        this.ok(res, fillDTO(MachineRdo, machine));
    }
}