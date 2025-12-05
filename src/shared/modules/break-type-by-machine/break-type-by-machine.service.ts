import {inject, injectable} from "inversify";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../../libs/logger/index.js";
import {types} from "@typegoose/typegoose";
import {BreakTypeByMachineEntity} from "./break-type-by-machine.entity.js";
import {BreakTypeByMachineServiceInterface} from "./break-type-by-machine-service.interface.js";
import {CreateBreakTypeByMachineDto} from "./dto/create-break-type-by-machine.dto.js";
import {DocumentType} from "@typegoose/typegoose/lib/types.js";

@injectable()
export class BreakTypeByMachineService implements BreakTypeByMachineServiceInterface {
    constructor(
        @inject(Component.Logger) private readonly logger: LoggerInterface,
        @inject(Component.BreakTypeByMachineModel) private readonly breakTypeByMachineModel: types.ModelType<BreakTypeByMachineEntity>
    ) {
    }
    public async create(dto: CreateBreakTypeByMachineDto): Promise<DocumentType<BreakTypeByMachineEntity>> {
        const result = (await this.breakTypeByMachineModel.create(dto)).populate(['machine']);
        this.logger.info(`New break type ${dto.description} by ${dto.machine}`);

        return result;
    }

    public find(): Promise<DocumentType<BreakTypeByMachineEntity>[]> {
        return this.breakTypeByMachineModel.find().populate('machine').exec();
    }
}