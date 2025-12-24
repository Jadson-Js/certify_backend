import { injectable } from 'inversify';
import { Resend } from 'resend';
import { env } from '../../../shared/environments/constants.js';
import { InternalServerError } from '../../../shared/error/AppError.js';
import type {
  IEmailService,
  IEmailServiceSendInput,
} from '../../../domain/services/IEmailService.js';

@injectable()
export class EmailService implements IEmailService {
  private readonly resend = new Resend(env.RESEND_KEY);

  async send(params: IEmailServiceSendInput) {
    const { data, error } = await this.resend.emails.send({
      from: 'CertiFy <onboarding@resend.dev>',
      to: [params.to],
      subject: params.subject,
      html: params.html,
    });

    if (error) throw new InternalServerError();
  }
}
