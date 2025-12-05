import {Container} from "inversify";
import {AuthServiceInterface} from "./auth-service.interface.js";
import {Component} from "../../types/index.js";
import {AuthService} from "./auth.service.js";
import {ExceptionFilterInterface} from "../../libs/rest/index.js";
import {AuthExceptionFilter} from "./auth.exception-filter.js";

export function createAuthContainer() {
    const authContainer = new Container();
    authContainer.bind<AuthServiceInterface>(Component.AuthService).to(AuthService).inSingletonScope();
    authContainer.bind<ExceptionFilterInterface>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

    return authContainer;
}