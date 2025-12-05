import {Request} from "express";
import {RequestParamsType} from "./request.params.type.js";
import {RequestBodyType} from "./request-body.type.js";
import {CreateUserDto} from "../../../modules/user/dto/create-user.dto.js";

export type CreateUserRequestType = Request<RequestParamsType, RequestBodyType, CreateUserDto>;