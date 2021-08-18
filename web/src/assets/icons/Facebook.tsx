import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

const Facebook: React.FC<SvgIconProps> = ({ viewBox, ...props }) => (
  <SvgIcon {...props} viewBox="0 0 21 20">
    <path
      d="M3.39 2H17.62C18.11 2 18.5 2.39 18.5 2.88V17.12C18.5 17.6 18.11 18 17.62 18H13.54V11.8H15.62L15.93 9.39H13.54V7.85C13.54 7.15 13.74 6.67 14.74 6.67H16.02V4.51C15.8 4.48 15.04 4.42 14.16 4.42C12.31 4.42 11.05 5.54 11.05 7.61V9.39H8.96V11.8H11.05V18H3.39C3.15568 18 2.93081 17.9076 2.76418 17.7429C2.59756 17.5781 2.50263 17.3543 2.5 17.12V2.88C2.5 2.39 2.9 2 3.39 2Z"
      fill="#1778F2"
    />
  </SvgIcon>
);

export default Facebook;
