import {Request} from "express";
import {RequestBodyType, RequestParamsType} from "../../libs/rest/index.js";
import {CreateSupplyDto} from "./dto/create-supply.dto.js";

export type CreateSupplyRequestType = Request<RequestParamsType, RequestBodyType, CreateSupplyDto>;