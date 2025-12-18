import {NodemailerInterface} from "./nodemailer.interface.js";
import {inject, injectable} from "inversify";
import {Component} from "../../types/index.js";
import {LoggerInterface} from "../logger/index.js";
import nodemailer from "nodemailer";
import {ConfigInterface} from "../config/index.js";
import {RestSchema} from "../config/rest.schema.js";

@injectable()
export class Nodemailer implements NodemailerInterface {
    constructor(
        @inject(Component.Logger) private readonly logger: LoggerInterface,
        @inject(Component.Config) private readonly config: ConfigInterface<RestSchema>
    ) {
    }
    public async sendEmail(recipients: string[], title: string, htmlBody: string, text: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: "smtp.detail-project.ru",
            port: 465,
            secure: true,
            auth: {
                user: this.config.get('EMAIL'),
                pass: this.config.get('EMAIL_PASSWORD'),
            },
        });

        const info = await transporter.sendMail({
            from: "events_notifications@detail-project.ru",
            to: recipients,
            subject: `${title}`,
            text: `${text}`,
            html: htmlBody,
        });
        this.logger.info("Email sending success: %s", info.response);
    }
}