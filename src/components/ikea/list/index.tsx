import React, { FC } from "react";
import theme from "@tidbits/react-tidbits/theme";
import { Box, TabbedHeader } from "@tidbits/react-tidbits";
import { ThemeProvider } from "styled-components";
import {
  PageContainer,
  PageMenuType,
} from "../../shared-library/src/tidbits/page";

import { LakehouseForm } from "../form";

export const IkeasList: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <TabbedHeader>
          <TabbedHeader.ResponsiveTabs variant="secondary" color="black">
            <TabbedHeader.Tab>Products</TabbedHeader.Tab>
            <TabbedHeader.Tab>Rooms</TabbedHeader.Tab>
            <TabbedHeader.Tab>Offers</TabbedHeader.Tab>
            <TabbedHeader.Tab>Back to school</TabbedHeader.Tab>
          </TabbedHeader.ResponsiveTabs>
        </TabbedHeader>
        <PageContainer
          title="Returns"
          data-testid="ikeas-list"
          pageMenuType={PageMenuType.OTHER}
        >
          <Box px="60px" py="30px">
            <LakehouseForm />
          </Box>
        </PageContainer>
      </Box>
    </ThemeProvider>
  );
};

export default IkeasList;
