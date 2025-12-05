import {Request} from "express";
import {RequestBodyType, RequestParamsType} from "../../libs/rest/index.js";
import {CreateMachineDto} from "./dto/create-machine.dto.js";

export type CreateMachineRequestType = Request<RequestParamsType, RequestBodyType, CreateMachineDto>;