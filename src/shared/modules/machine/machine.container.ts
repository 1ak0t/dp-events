import {Container} from "inversify";
import {types} from "@typegoose/typegoose";
import {MachineEntity, MachineModel} from "./machine.entity.js";
import {Component} from "../../types/index.js";
import {MachineServiceInterface} from "./machine-service.interface.js";
import {DefaultMachineService} from "./default-machine.service.js";
import {ControllerInterface} from "../../libs/rest/index.js";
import {MachineController} from "./machine.controller.js";

export function createMachineContainer() {
    const machineContainer = new Container();

    machineContainer.bind<types.ModelType<MachineEntity>>(Component.MachineModel).toConstantValue(MachineModel);
    machineContainer.bind<MachineServiceInterface>(Component.MachineService).to(DefaultMachineService).inSingletonScope();
    machineContainer.bind<ControllerInterface>(Component.MachineController).to(MachineController).inSingletonScope();

    return machineContainer;
}