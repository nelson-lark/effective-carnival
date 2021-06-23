import React, { useEffect } from "react";
import { Auth } from "aws-amplify";

const SignOut: React.FC = () => {
  useEffect(() => {
    (async () => {
      try {
        await Auth.signOut();
      } catch (e) {
        // We do nothing - Auth.signOut() can throw error only when performing global sign out, which is not a case here.
      }
    })();
  }, []);

  return null;
};

export default SignOut;
