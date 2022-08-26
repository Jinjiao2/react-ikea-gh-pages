import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

import React, { FC, useEffect, useState } from "react";

import { Button, Modal, List, Box, Icons, Text } from "@tidbits/react-tidbits";
import TopHeader from "@tidbits/react-tidbits/TopHeader";
import { GlobalStyle } from "@tidbits/react-tidbits/global";
import theme, { dark } from "@tidbits/react-tidbits/theme";

import { Logo } from "./logo";
import { TopLinks } from "./top-links";
import IkeasList from "../ikea/list";
import Content from "@tidbits/react-tidbits/Content";

const Container = styled.div`
  height: 100vh;
  display: grid;
  background-color: white;
  grid-template-rows: auto 1fr auto;
`;

export const DataPlatformShell: FC = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const GlobalBodyStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;
  const renderModal = () => {
    return (
      <Modal.Window
        open={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        closeOnEscape={true}
        closeOnClickOutside={true}
      >
        <Modal.Content>
          <Modal.Header>Current versions</Modal.Header>
          <Modal.Body>
            <List.UL listStyle="noBullet">
              {process.env.UI_VERSION?.split(",")?.map((item: string) => {
                return <List.LI key={item}>{item}</List.LI>;
              })}
            </List.UL>
          </Modal.Body>
        </Modal.Content>
        <Modal.Footer display="flex" justifyContent="flex-end">
          <Button
            variant="standard"
            primary
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal.Window>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box bg="black">
        <TextWrapper>
          <Text textStyle="bodyMedium" color="white">
            <Icons.PenIcon height="13px" width="13px" pt="2px" mr="8px" />
            Personalized planning services
          </Text>
          <Text color="white" textStyle="bodyMedium">
            <Icons.SiriCircleIcon
              height="13px"
              width="13px"
              pt="2px"
              mr="8px"
            />
            We're experiencing supply issues
          </Text>
          <Text color="white" textStyle="bodyMedium">
            <Icons.HeartCircleFilledIcon
              height="13px"
              width="13px"
              pt="2px"
              mr="8px"
            />
            Join IKEA Family for free | Get member-only discounts
          </Text>
        </TextWrapper>
      </Box>
      <Container data-testid="content">
        <GlobalStyle />
        <GlobalBodyStyle />
        <Box display="flex" flexDirection="column">
          <TopHeader
            variant="full"
            containerProps={{
              position: "sticky",
              height: "70px",
              backgroundColor: "bg",
            }}
            banner={<Logo data-testid="logo" />}
            links={<TopLinks data-testid="top-links" />}
            user={
              <TopHeader.User>
                <Icons.PersonIcon
                  height="16px"
                  width="16px"
                  color="black"
                  mr="5px"
                  pt="5px"
                />
                Hej! Kelly Westover
              </TopHeader.User>
            }
          />
        </Box>
        <Content>
          <IkeasList />
        </Content>
      </Container>
      {isModalOpen && renderModal()}
    </ThemeProvider>
  );
};
const TextWrapper = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  box-sizing: border-box;
  width: 80%;
  background-color: black;
  padding: 0 1.25rem;
  min-height: 40px;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  margin-left: 10%;
`;
