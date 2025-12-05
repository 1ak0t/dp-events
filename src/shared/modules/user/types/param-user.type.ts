import { ParamsDictionary } from 'express-serve-static-core';

export type ParamUserType = {
    userId: string;
} | ParamsDictionary;