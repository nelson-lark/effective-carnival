import React from "react";
import { Auth } from "aws-amplify";
import { Redirect, useHistory } from "react-router-dom";

import Paths from "@routing/paths";
import useQuery from "@utils/useQuery";

import CreateNewPasswordState from "./CreateNewPasswordView/CreateaNewPasswordForm/CreateNewPasswordState";
import CreateNewPasswordView from "./CreateNewPasswordView/CreateNewPasswordView";

const CreateNewPassword: React.FC = () => {
  const query = useQuery();
  const username: string | null = query.get("username");
  const code: string | null = query.get("code");
  const history = useHistory();

  const onSavePassword = async (formData: CreateNewPasswordState) => {
    if (username && code) {
      try {
        await Auth.forgotPasswordSubmit(username, code, formData.password);
        history.push(Paths.SIGN_IN_PATH, { keepNotification: true });
      } catch (e) {
        throw new Error(e);
      }
    }
  };

  if (!username || !code) return <Redirect to="/" />;

  return <CreateNewPasswordView onSavePassword={onSavePassword} />;
};
export default CreateNewPassword;
