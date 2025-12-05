import {Response} from "express";

export interface EventEmitterInterface {
    execute(): void;
    on(name: string, res: Response, message?: string): void;
    emit(name: string, message?: string): void;
}