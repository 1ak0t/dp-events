import {Container} from "inversify";
import {types} from "@typegoose/typegoose";
import {BreakEntity, BreakModel} from "./break.entity.js";
import {Component} from "../../types/index.js";
import {BreakServiceInterface} from "./break-service.interface.js";
import {DefaultBreakService} from "./default-break.service.js";
import {ControllerInterface} from "../../libs/rest/index.js";
import {BreakController} from "./break.controller.js";

export function createBreakContainer() {
    const breakContainer = new Container();
    breakContainer.bind<types.ModelType<BreakEntity>>(Component.BreakModel).toConstantValue(BreakModel);
    breakContainer.bind<BreakServiceInterface>(Component.BreakService).to(DefaultBreakService).inSingletonScope();
    breakContainer.bind<ControllerInterface>(Component.BreakController).to(BreakController).inSingletonScope();

    return breakContainer;
}