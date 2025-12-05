import {Request} from "express";
import {RequestBodyType, RequestParamsType} from "../../libs/rest/index.js";
import {CreateBreakDto} from "./dto/create-break.dto.js";

export type CreateBreakRequestType = Request<RequestParamsType, RequestBodyType, CreateBreakDto>;