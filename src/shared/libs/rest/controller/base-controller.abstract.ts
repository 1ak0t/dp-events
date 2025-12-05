import {injectable} from "inversify";
import {ControllerInterface} from "./controller.interface.js";
import {Response, Router} from "express";
import {LoggerInterface} from "../../logger/index.js";
import {RouteInterface} from "../route.interface.js";
import {StatusCodes} from "http-status-codes";
import asyncHandler from 'express-async-handler';

@injectable()
export abstract class BaseControllerAbstract implements ControllerInterface {
    private readonly DEFAULT_CONTENT_TYPE = 'application/json';
    private readonly _router: Router;

    constructor(
        protected readonly logger: LoggerInterface
    ) {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    public addRoute(route: RouteInterface) {
        const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
        const middlewareHandlers = route.middlewares?.map(
            (item) => asyncHandler(item.execute.bind(item))
        );
        const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;
        this._router[route.method](route.path, allHandlers);
        this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
    }

    public send<T>(res: Response, statusCode: number, data: T) {
        res
            .type(this.DEFAULT_CONTENT_TYPE)
            .status(statusCode)
            .json(data);
    }

    public created<T>(res: Response, data: T) {
        this.send(res, StatusCodes.CREATED, data);
    }

    public noContent<T>(res: Response, data: T) {
        this.send(res, StatusCodes.NO_CONTENT, data);
    }

    public ok<T>(res: Response, data: T) {
        this.send(res, StatusCodes.OK, data);
    }
}