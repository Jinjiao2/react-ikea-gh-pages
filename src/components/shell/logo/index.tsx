import React from "react";

import { TopHeader } from "@tidbits/react-tidbits";

import IkeaIconLight from "../../shared/assets/Ikea_logo.svg";

interface Props {
  "data-testid": string;
}

export const Logo = ({ "data-testid": dataTestId }: Props): JSX.Element => {
  return (
    <TopHeader.Banner data-testid={dataTestId} href="/projects">
      <img src={IkeaIconLight} alt="ikea logo" />
    </TopHeader.Banner>
  );
};
