export interface IEmailServiceSendInput {
  to: string;
  subject: string;
  html: string;
}

export interface IEmailService {
  send(params: IEmailServiceSendInput): Promise<void>;
}
