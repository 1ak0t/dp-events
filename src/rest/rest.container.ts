import {Container} from "inversify";
import {RestApplication} from "./rest.application.js";
import {Component} from "../shared/types/index.js";
import {LoggerInterface, PinoLogger} from "../shared/libs/logger/index.js";
import {ConfigInterface, RestConfig} from "../shared/libs/config/index.js";
import {RestSchema} from "../shared/libs/config/rest.schema.js";
import {DatabaseClientInterface} from "../shared/libs/database-client/database-client.interface.js";
import {MongoDatabaseClient} from "../shared/libs/database-client/mongo.database-client.js";
import {ExceptionFilter, ExceptionFilterInterface} from "../shared/libs/rest/index.js";
// import {EventEmitterInterface} from "../shared/libs/event-emitter/event-emitter.interface.js";
// import {EventEmitter} from "../shared/libs/event-emitter/event-emitter.js";

export function createRestApplicationContainer() {
    const restApplicationContainer = new Container();

    restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
    restApplicationContainer.bind<LoggerInterface>(Component.Logger).to(PinoLogger).inSingletonScope();
    //restApplicationContainer.bind<EventEmitterInterface>(Component.Emitter).to(EventEmitter).inSingletonScope();
    restApplicationContainer.bind<ConfigInterface<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
    restApplicationContainer.bind<DatabaseClientInterface>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
    restApplicationContainer.bind<ExceptionFilterInterface>(Component.ExceptionFilter).to(ExceptionFilter).inSingletonScope();

    return restApplicationContainer;
}