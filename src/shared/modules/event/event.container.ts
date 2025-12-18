import {Container} from "inversify";
import {types} from "@typegoose/typegoose";
import {EventEntity, EventModel} from "./event.entity.js";
import {Component} from "../../types/index.js";
import {EventServiceInterface} from "./event-service.interface.js";
import {EventService} from "./event.service.js";
import {ControllerInterface} from "../../libs/rest/index.js";
import {EventController} from "./event.controller.js";

export function createEventContainer() {
    const eventContainer = new Container();
    eventContainer.bind<types.ModelType<EventEntity>>(Component.EventModel).toConstantValue(EventModel);
    eventContainer.bind<EventServiceInterface>(Component.EventService).to(EventService).inSingletonScope();
    eventContainer.bind<ControllerInterface>(Component.EventController).to(EventController).inSingletonScope();

    return eventContainer;
}