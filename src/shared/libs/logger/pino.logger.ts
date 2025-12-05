import {LoggerInterface} from "./logger.interface.js";
import {Logger as PinoInstance, pino, transport} from "pino";
import {getCurrentModuleDirectoryPath} from "../../helpers/index.js";
import {resolve} from "node:path";
import {injectable} from "inversify";

@injectable()
export class PinoLogger implements LoggerInterface {
    private readonly logger: PinoInstance;

    constructor() {
        const modulePath = getCurrentModuleDirectoryPath();
        const logFilePath = 'logs/rest.log';
        const destination = resolve(modulePath, '../../../', logFilePath);

        const multiTransport = transport({
            targets: [
                {
                    target: 'pino/file',
                    options: {destination},
                    level: 'debug'
                },
                {
                    target: 'pino/file',
                    options: {},
                    level: 'info'
                }
            ]
        });

        this.logger = pino({}, multiTransport);
    }

    public debug(message: string, ...args: unknown[]) {
        this.logger.debug(message, ...args);
    }

    public error(message: string, error: Error, ...args: unknown[]) {
        this.logger.error(error, message, ...args);
    }

    public info(message: string, ...args: unknown[]) {
        this.logger.info(message, ...args);
    }

    public warn(message: string, ...args: unknown[]) {
        this.logger.warn(message, ...args);
    }
}