import {Request} from "express";
import {RequestParamsType} from "./request.params.type.js";
import {RequestBodyType} from "./request-body.type.js";
import {UpdateUserDto} from "../../../modules/user/dto/update-user.dto.js";

export type SubscribeUserRequestType = Request<RequestParamsType, RequestBodyType, UpdateUserDto>;