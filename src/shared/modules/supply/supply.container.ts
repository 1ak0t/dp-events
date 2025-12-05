import {Container} from "inversify";
import {types} from "@typegoose/typegoose";
import {SupplyEntity, SupplyModel} from "./supply.entity.js";
import {Component} from "../../types/index.js";
import {SupplyServiceInterface} from "./supply-service.interface.js";
import {SupplyService} from "./supply.service.js";
import {SupplyController} from "./supply.controller.js";
import {ControllerInterface} from "../../libs/rest/index.js";

export function createSupplyContainer() {
    const supplyContainer = new Container();

    supplyContainer.bind<types.ModelType<SupplyEntity>>(Component.SupplyModel).toConstantValue(SupplyModel);
    supplyContainer.bind<SupplyServiceInterface>(Component.SupplyService).to(SupplyService).inSingletonScope();
    supplyContainer.bind<ControllerInterface>(Component.SupplyController).to(SupplyController).inSingletonScope();

    return supplyContainer;
}