import React, { useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";

import Form from "@components/Form";
import SendFeedbackState from "./SendFeedbackState";
import sendFeedbackValidationScheme from "./sendFeedbackValidationScheme";
import useStyles from "./styles";

export interface Props {
  open: boolean;
  sending: boolean;
  dataTestId?: string;
  onClose(): void;
  onSend(formData: SendFeedbackState): void;
}

const SendFeedbackModal: React.FC<Props> = ({
  open,
  sending,
  dataTestId = "send-feedback-modal-container",
  onClose,
  onSend,
}) => {
  const { t } = useTranslation(["common", "field", "feedback"]);
  const classes = useStyles();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SendFeedbackState>({
    defaultValues: {
      description: "",
    },
    resolver: yupResolver(sendFeedbackValidationScheme()),
  });

  const onSubmit = ({ description }: SendFeedbackState) => {
    onSend({ description });
  };

  useEffect(() => {
    if (!sending) {
      reset({ description: "" }, { keepValues: false });
    }
  }, [sending, reset]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="feedback-dialog-title"
      fullWidth
      data-testid={dataTestId}
      maxWidth="xs">
      <DialogTitle id="feedback-dialog-title">{t("Send feedback")}</DialogTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                InputProps={{
                  inputProps: {
                    "data-testid": "send-feedback-textarea",
                  },
                }}
                label={t("field:Description")}
                placeholder={t(
                  "feedback:Describe your issue or share your ideas"
                )}
                error={!!errors.description?.message}
                helperText={errors.description?.message}
                color="secondary"
                multiline
                autoFocus
                fullWidth
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Box display="flex" flexDirection="row-reverse" justifyContent="end">
            <div className={classes.wrapper}>
              <Button
                type="submit"
                data-testid="send-feedback-send-button"
                color="secondary"
                disabled={sending}>
                {t("Send")}
              </Button>
              {sending && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
            <Button
              data-testid="send-feedback-cancel-button"
              onClick={handleClose}>
              {t("Cancel")}
            </Button>
          </Box>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default SendFeedbackModal;
