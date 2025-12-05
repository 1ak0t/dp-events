import {Request} from "express";
import {RequestBodyType, RequestParamsType} from "../../libs/rest/index.js";
import {CreateBreakTypeByMachineDto} from "./dto/create-break-type-by-machine.dto.js";

export type CreateBreakTypeRequestType = Request<RequestParamsType, RequestBodyType, CreateBreakTypeByMachineDto>;