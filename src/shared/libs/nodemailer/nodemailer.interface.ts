export interface NodemailerInterface {
    sendEmail(recipients: string[], title: string, htmlBody: string, text: string): Promise<void>;
}