export default interface SendEmailSQSEvent {
  template: string;
  locale: string;
  addressTo: string;
  subject: string;
  replacements: [RegExp, string][];
}
