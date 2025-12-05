import { ParamsDictionary } from 'express-serve-static-core';

export type ParamMachineidType = {
    machineId: string;
} | ParamsDictionary;