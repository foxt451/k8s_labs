import { Inject, Injectable, Logger } from '@nestjs/common';
import { SendMailPayload } from 'src/types/sender/SendMailPayload';
import * as nodemailer from 'nodemailer';
import emailConfiguration from 'src/config/email.config';
import { ConfigType } from '@nestjs/config';
import { SendEventPayload } from 'src/types/sender/SendEventPayload';
import { PRESET } from 'src/enums/presets';
import { pugCompilers } from 'src/pug';
import { subjects } from 'src/subjects';

@Injectable()
export class SenderService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(SenderService.name);

  public constructor(
    @Inject(emailConfiguration.KEY)
    private emailConfig: ConfigType<typeof emailConfiguration>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: emailConfig.auth.user, // generated ethereal user
        pass: emailConfig.auth.pass, // generated ethereal password
      },
    });
  }

  public async constructAndSendMail<T extends PRESET>(
    payload: SendEventPayload<T>,
  ) {
    await this.sendMail({
      receivers: payload.receivers,
      bodyHTML: pugCompilers[payload.preset](payload.args),
      subject: subjects[payload.preset],
    });
  }

  public async sendMail(payload: SendMailPayload) {
    await this.transporter.sendMail({
      from: `"${this.emailConfig.userTitle}" <${this.emailConfig.auth.user}>`, // sender address
      to: payload.receivers.join(', '), // list of receivers
      subject: payload.subject, // Subject line
      html: payload.bodyHTML, // html body
    });
    this.logger.log(
      `Sent an email to ${payload.receivers}, subject: ${payload.subject}`,
    );
  }
}
