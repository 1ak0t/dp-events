import {ParamsDictionary} from "express-serve-static-core";

export type ParamEventType = {
    userId: string;
    eventId: string;
} | ParamsDictionary;