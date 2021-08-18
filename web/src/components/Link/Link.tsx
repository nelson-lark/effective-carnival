import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink, LinkProps } from "@material-ui/core";

type Props = Omit<LinkProps, "component" | "href"> & { to: string };

const Link: React.FC<Props> = ({ children, ...props }) => {
  return (
    <MuiLink component={RouterLink} {...props}>
      {children}
    </MuiLink>
  );
};

export default Link;
