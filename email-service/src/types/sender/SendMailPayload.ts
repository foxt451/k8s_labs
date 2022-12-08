export type SendMailPayload = {
  receivers: string[];
  subject: string;
  bodyHTML: string;
};
