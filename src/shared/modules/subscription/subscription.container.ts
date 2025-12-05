import {Container} from "inversify";
import {types} from "@typegoose/typegoose";
import {SubscriptionEntity, SubscriptionModel} from "./subscription.entity.js";
import {Component} from "../../types/index.js";
import {SubscriptionServiceInterface} from "./subscription-service.interface.js";
import {SubscriptionService} from "./subscription-service.js";

export function createSubscriptionContainer() {
    const subscriptionContainer = new Container();
    subscriptionContainer.bind<types.ModelType<SubscriptionEntity>>(Component.SubscriptionModel).toConstantValue(SubscriptionModel);
    subscriptionContainer.bind<SubscriptionServiceInterface>(Component.SubscriptionService).to(SubscriptionService).inSingletonScope();

    return subscriptionContainer;
}