export default interface SendTextMessageSQSEvent {
  template: string;
  locale: string;
  phoneNumber: string;
  replacements: [RegExp, string][];
}
