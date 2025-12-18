import {Request} from "express";
import {RequestBodyType, RequestParamsType} from "../../libs/rest/index.js";
import {CreateEventDto, successWarningEventDto} from "./dto/create-event.dto.js";

export type CreateEventRequestType = Request<RequestParamsType, RequestBodyType, CreateEventDto>;
export type SuccessWarningEventRequestType = Request<RequestParamsType, RequestBodyType, successWarningEventDto>;