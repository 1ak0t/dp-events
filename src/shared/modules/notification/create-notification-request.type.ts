import {Request} from "express";
import {RequestBodyType, RequestParamsType} from "../../libs/rest/index.js";
import {CreateNotificationDto} from "./dto/create-notification.dto.js";

export type CreateNotificationRequestType = Request<RequestParamsType, RequestBodyType, CreateNotificationDto>;