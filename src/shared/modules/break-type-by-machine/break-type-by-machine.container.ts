import {Container} from "inversify";
import {types} from "@typegoose/typegoose";
import {BreakTypeByMachineEntity, BreakTypeByMachineModel} from "./break-type-by-machine.entity.js";
import {Component} from "../../types/index.js";
import {BreakTypeByMachineServiceInterface} from "./break-type-by-machine-service.interface.js";
import {BreakTypeByMachineService} from "./break-type-by-machine.service.js";
import {ControllerInterface} from "../../libs/rest/index.js";
import {BreakTypeByMachineController} from "./break-type-by-machine.controller.js";

export function createBreakTypeByMachineContainer() {
    const breakTypeByMachineContainer = new Container();

    breakTypeByMachineContainer.bind<types.ModelType<BreakTypeByMachineEntity>>(Component.BreakTypeByMachineModel).toConstantValue(BreakTypeByMachineModel);
    breakTypeByMachineContainer.bind<BreakTypeByMachineServiceInterface>(Component.BreakTypeByMachineService).to(BreakTypeByMachineService).inSingletonScope();
    breakTypeByMachineContainer.bind<ControllerInterface>(Component.BreakTypeByMachineController).to(BreakTypeByMachineController).inSingletonScope();

    return breakTypeByMachineContainer;
}