export interface CronServiceInterface {
    addMailSend(recipients: string[], title: string, htmlBody: string, text: string, needConfirm?: boolean, eventId?: string): Promise<void>;
    checkEveryDayDeadLines(): Promise<void>;
}