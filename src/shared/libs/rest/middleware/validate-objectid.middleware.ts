import {MiddlewareInterface} from "./middleware.interface.js";
import e from "express";
import {Types} from "mongoose";
import {HttpError} from "../errors/http-error.js";
import {StatusCodes} from "http-status-codes";

export class ValidateObjectidMiddleware implements MiddlewareInterface {
    constructor(private param: string) {
    }

    public execute({params}: e.Request, _res: e.Response, next: e.NextFunction) {
        const objectId = params[this.param];

        if (Types.ObjectId.isValid(objectId)) {
            return next();
        }

        throw new HttpError(
            StatusCodes.BAD_REQUEST,
            `${objectId} is invalid ObjectID`,
            'ValidateObjectIdMiddleware'
        );
    }
}