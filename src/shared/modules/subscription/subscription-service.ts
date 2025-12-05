import {inject, injectable} from "inversify";
import {SubscriptionServiceInterface} from "./subscription-service.interface.js";
import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {SubscriptionEntity} from "./subscription.entity.js";

import {Component} from "../../types/index.js";
import {types} from "@typegoose/typegoose";
import {PushSubscriptionDTO} from "./dto/create-subscription.dto.js";
import {UserRoles} from "../../types/user.type.js";
import {Document, Types} from "mongoose";

@injectable()
export class SubscriptionService implements SubscriptionServiceInterface {
    constructor(
        @inject(Component.SubscriptionModel) private readonly subscriptionModel: types.ModelType<SubscriptionEntity>
    ) {}

    public async create(dto: PushSubscriptionDTO): Promise<DocumentType<SubscriptionEntity>> {
        const subsNotExp = {...dto, expirationTime: null};
        const result = await this.subscriptionModel.create(subsNotExp);

        return result;
    }

    public async getAll(roles: UserRoles[]): Promise<DocumentType<SubscriptionEntity>[]> {
        let allSubs: (Document<unknown, types.BeAnObject, SubscriptionEntity> & Omit<SubscriptionEntity & Required<{     _id: Types.ObjectId }>, "typegooseName"> & types.IObjectWithTypegooseFunction)[] = [];
        for (const role of roles) {
            const subs = await this.subscriptionModel.find({"roles": {$in: [role]}}).select("-_id -createdAt -updatedAt -__v -roles").exec();
            allSubs.push(...subs);
        }

        allSubs = allSubs.filter((value: any, index: any, self: any) =>
                index === self.findIndex((t: any) => (
                    t.endpoint === value.endpoint
                ))
        )

        return allSubs;
    }
}