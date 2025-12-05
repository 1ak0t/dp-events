import {inject, injectable} from "inversify";
import {ExceptionFilterInterface} from "../../libs/rest/index.js";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../../libs/logger/index.js";
import e from "express";
import {BaseUserException} from "./errors/base-user.exception.js";

@injectable()
export class AuthExceptionFilter implements ExceptionFilterInterface {
    constructor(
        @inject(Component.Logger) private readonly logger: LoggerInterface
    ) {
        this.logger.info('Register AuthExceptionFilter');
    }

    public catch(error: unknown, _req: e.Request, res: e.Response, next: e.NextFunction) {
        if (!(error instanceof BaseUserException)) {
            return next(error);
        }

        this.logger.error(`[AuthModule] ${error.message}`, error);
        res.status(error.httpStatusCode)
            .json({
                type: 'AUTHORIZATION',
                error: error.message,
            });
    }
}