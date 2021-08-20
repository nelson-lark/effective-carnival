import React from "react";

import { ApolloProvider } from "@apollo/client";
import { LinearProgress } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";

import AppShell from "@layouts/AppShell";
import UserProvider from "@features/User/UserProvider";
import ThemeProvider from "@features/Theme/ThemeProvider";
import SnackProvider from "@features/Snack/SnackProvider";

import useApolloClient from "../../apollo/useApolloClient";
import useStyle from "./styles";

const Providers: React.FC = ({ children }) => {
  const classes = useStyle();
  const client = useApolloClient();

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Router>
          <React.Suspense
            fallback={<LinearProgress className={classes.progress} />}>
            <ThemeProvider>
              <SnackProvider>
                <AppShell>{children}</AppShell>
              </SnackProvider>
            </ThemeProvider>
          </React.Suspense>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
};

export default Providers;
