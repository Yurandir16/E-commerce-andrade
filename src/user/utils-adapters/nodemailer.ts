import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { IMessage, mailerRepository } from '../domain/repositories/mailerRepository';

export class MailNodemailerProvider implements mailerRepository {
    private readonly transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '193251@ids.upchiapas.edu.mx',
                pass: 'soy plebeyo1',
            },
        });
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email,
            },
            from: {
                name: message.from.name,
                address: message.from.email,
            },
            subject: message.subject,
            html: message.body,
        });
    }
}
