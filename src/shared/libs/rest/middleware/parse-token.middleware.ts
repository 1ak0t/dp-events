import {TokenPayload} from "../../../modules/auth/types/tokenPayload.js";
import {MiddlewareInterface} from "./middleware.interface.js";
import {NextFunction, Request, Response} from "express";
import {jwtVerify} from "jose";
import { createSecretKey } from 'node:crypto';
import {HttpError} from "../errors/http-error.js";
import {StatusCodes} from "http-status-codes";

function isTokenPayload(payload: unknown): payload is TokenPayload {
    return (
        (typeof payload === 'object' && payload !== null) &&
        ('email' in payload && typeof payload.email === 'string') &&
        ('surname' in payload && typeof payload.surname === 'string') &&
        ('name' in payload && typeof payload.name === 'string') &&
        ('id' in payload && typeof payload.id === 'string')
    );
}

export class ParseTokenMiddleware implements MiddlewareInterface {
    constructor(private readonly jwtSecret: string) {
    }

    public async execute(req: Request, _res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        if (!token) {
            return next();
        }


        try {
            const {payload} = await jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));

            if (isTokenPayload(payload)) {
                req.tokenPayload = {...payload};
                return next();
            } else {
                throw new Error('Bad token');
            }
        } catch {
            return next(new HttpError(
                StatusCodes.UNAUTHORIZED,
                'Invalid token',
                'AuthenticateMiddleware')
            );
        }
    }
}