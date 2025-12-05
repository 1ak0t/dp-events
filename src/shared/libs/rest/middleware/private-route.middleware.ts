import {MiddlewareInterface} from "./middleware.interface.js";
import {NextFunction, Request, Response} from "express";
import {HttpError} from "../errors/http-error.js";
import {StatusCodes} from "http-status-codes";

export class PrivateRouteMiddleware implements MiddlewareInterface {
    public async execute({ tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
        if (! tokenPayload) {
            throw new HttpError(
                StatusCodes.UNAUTHORIZED,
                'Вы не авторизованы, необходимо войти',
                'PrivateRouteMiddleware'
            );
        }

        return next();
    }
}