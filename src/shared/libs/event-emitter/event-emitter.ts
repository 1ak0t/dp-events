// import {EventEmitterInterface} from "./event-emitter.interface.js";
// import {Response} from "express";
// import {injectable} from "inversify";
//
// @injectable()
// export class EventEmitter implements EventEmitterInterface {
//     private emitter: any;
//
//     constructor() {
//     }
//
//     execute() {
//         this.emitter = new EventEmitter();
//     }
//
//     on(name: string, res: Response, _message?: string) {
//         this.emitter.on(name, () => {
//             res.write(`data: Update /n/n`);
//         })
//     }
//
//     emit(name: string, message?: string) {
//         console.log(this.emitter);
//         this.emitter.emit(name, message);
//     }
// }