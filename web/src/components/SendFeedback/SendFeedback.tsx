import React from "react";

import { useSendFeedbackMutation } from "./graphql/mutations.generated";

import SendFeedbackModal from "./SendFeedbackView";
import SendFeedbackState from "./SendFeedbackView/SendFeedbackState";

export interface Props {
  open: boolean;
  onClose(): void;
}

const SendFeedback: React.FC<Props> = ({ open, onClose }) => {
  const [sendFeedback, { loading: sending }] = useSendFeedbackMutation();

  const handleSend = async (formData: SendFeedbackState) => {
    try {
      await sendFeedback({
        variables: { feedback: formData },
      });
      onClose();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return (
    <SendFeedbackModal
      open={open}
      onClose={onClose}
      onSend={handleSend}
      sending={sending}
    />
  );
};

export default SendFeedback;
