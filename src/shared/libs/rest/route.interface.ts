import {HttpMethodEnum} from "./http-method.enum.js";
import {NextFunction, Request, Response} from "express";
import {MiddlewareInterface} from "./middleware/middleware.interface.js";

export interface RouteInterface {
    path: string;
    method: HttpMethodEnum;
    handler: (req: Request, res: Response, next: NextFunction) => void;
    middlewares?: MiddlewareInterface[];
}