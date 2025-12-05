import 'reflect-metadata';
import {RestApplication} from "./rest/index.js";
import {Container} from "inversify";
import {Component} from "./shared/types/index.js";
import {createRestApplicationContainer} from "./rest/rest.container.js";
import {createUserContainer} from "./shared/modules/user/index.js";
import {createBreakContainer} from "./shared/modules/break/break.container.js";
import {createMachineContainer} from "./shared/modules/machine/machine.container.js";
import {
    createBreakTypeByMachineContainer
} from "./shared/modules/break-type-by-machine/break-type-by-machine.container.js";
import {createAuthContainer} from "./shared/modules/auth/auth.container.js";
import {createSubscriptionContainer} from "./shared/modules/subscription/subscription.container.js";
import {createNotificationContainer} from "./shared/modules/notification/notification.container.js";
import { EventEmitter } from 'node:events';
import {createSupplyContainer} from "./shared/modules/supply/supply.container.js";

export const globalEmitter = new EventEmitter();

async function bootstrap() {
    const appContainer = Container.merge(
        createRestApplicationContainer(),
        createUserContainer(),
        createBreakContainer(),
        createMachineContainer(),
        createBreakTypeByMachineContainer(),
        createAuthContainer(),
        createSubscriptionContainer(),
        createNotificationContainer(),
        createSupplyContainer()
    );

    const application = appContainer.get<RestApplication>(Component.RestApplication);
    await application.init();
}

bootstrap();