import styled from "styled-components";

import React, { useState } from "react";
import DatePicker from "react-horizontal-datepicker";

import {
  Form,
  Table,
  MenuList,
  layouts,
  Box,
  Grid,
  Input,
  SearchAltIcon,
  Link as TidbitsLink,
  Text,
} from "@tidbits/react-tidbits";

import EchartsProjects from "../chart";

export const ConfigurationStep = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [isSelectedTime, setelectedTime] = useState(false);
  const onSearch = () => {
    setShowAddress(true);
  };
  const onDropdownclick = () => {
    setShowAddress(false);
    setShowGraph(true);
  };
  const selectedDay = (val) => {
    console.log(val);
  };
  const selectedTime = () => {
    setelectedTime(true);
  };
  return (
    <Box>
      <Text textStyle="h4Emph" mb="spacer15">
        Return at your local IKEA store
      </Text>
      <Grid
        gridTemplateColumns={["minmax(0, 1fr)", "300px minmax(0, 1fr)"]}
        gridColumnGap="35px"
        gridRowGap="5px"
        width="100%"
      >
        <Box p="10px" textStyle="bodyRegular">
          <Form.Label>
            Search by city, province
            <Input.Text
              IconComponent={SearchAltIcon}
              type="text"
              placeholder="Search"
              onChange={onSearch}
            />
          </Form.Label>

          {showAddress && (
            <MenuList>
              <MenuList.Item onClick={onDropdownclick}>
                {" "}
                <DropdownText textStyle="bodyEmph" mb="5px">
                  IKEA Coquitlam
                </DropdownText>
                <div>1000 Lougheed Highway, Coquitlam</div>
              </MenuList.Item>
              <MenuList.HR />
              <MenuList.Item onClick={onDropdownclick}>
                <DropdownText textStyle="bodyEmph" mb="5px">
                  IKEA Richmond
                </DropdownText>
                <div>3320 Jacombs Road, Richmond</div>
              </MenuList.Item>
            </MenuList>
          )}
          {showGraph && (
            <Box>
              <Text mt="20px" textStyle="h5Emph">
                IKEA Coquitlam
              </Text>
              <Para>Open until 9:00 p.m.</Para>
              <AddressPa>1000 Lougheed Highway, Coquitlam</AddressPa>
              <Para>Normal opening hours</Para>
              <Table>
                <Table.TBody>
                  <Table.TR hoverStyles>
                    <Table.TD>Mon - Fri</Table.TD>
                    <Table.TD>10:00 a.m. - 9:00 p.m.</Table.TD>
                  </Table.TR>
                  <Table.TR hoverStyles>
                    <Table.TD>Sat</Table.TD>
                    <Table.TD>10:00 a.m. - 8:00 p.m.</Table.TD>
                  </Table.TR>
                  <Table.TR hoverStyles>
                    <Table.TD>Sun</Table.TD>
                    <Table.TD>10:00 a.m. - 7:00 p.m.</Table.TD>
                  </Table.TR>
                </Table.TBody>
              </Table>
              <EchartsProjects />
            </Box>
          )}
        </Box>
        <Box textStyle="bodyRegular">
          <Wrapper>
            <DatePicker
              endDate={40}
              getSelectedDay={selectedDay}
              labelFormat={"MMMM"}
              color={"#111"}
            />
            <MenuList.HR />
            <layouts.EvenGrid cols={[1, 2, 4]}>
              <TimeWrapper>
                <Text id="cf">10:00 am</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">10:15 am</Text>
              </TimeWrapper>
              <TimeWrapper backgroundColor="ctrlDisabled">
                <Text id="cf">10:30 am</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">10:45 am</Text>
              </TimeWrapper>
              <TimeWrapper onClick={selectedTime} isSelected={isSelectedTime}>
                <Text id="cf">11:00 am</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">11:15 am</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">11:30 am</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">11:45 am</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">12:00 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">12:15 pm</Text>
              </TimeWrapper>
              <TimeWrapper backgroundColor="ctrlDisabled">
                <Text id="cf">12:30 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">12:45 pm</Text>
              </TimeWrapper>
              <TimeWrapper backgroundColor="ctrlDisabled">
                <Text id="cf">1:00 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">1:15 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">1:30 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">1:45 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">2:00 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">2:15 pm</Text>
              </TimeWrapper>
              <TimeWrapper backgroundColor="ctrlDisabled">
                <Text id="cf">2:30 pm</Text>
              </TimeWrapper>
              <TimeWrapper backgroundColor="ctrlDisabled">
                <Text id="cf">2:45 pm</Text>
              </TimeWrapper>
              <TimeWrapper backgroundColor="ctrlDisabled">
                <Text id="cf">3:00 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">3:15 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">3:30 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">3:45 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">4:00 pm</Text>
              </TimeWrapper>
              <TimeWrapper backgroundColor="ctrlDisabled">
                <Text id="cf">4:15 pm</Text>
              </TimeWrapper>
              <TimeWrapper backgroundColor="ctrlDisabled">
                <Text id="cf">4:30 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">4:45 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">5:00 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">5:15 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">5:30 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">5:45 pm</Text>
              </TimeWrapper>
              <TimeWrapper backgroundColor="ctrlDisabled">
                <Text id="cf">6:00 pm</Text>
              </TimeWrapper>
              <TimeWrapper backgroundColor="ctrlDisabled">
                <Text id="cf">6:15 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">6:30 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">6:45 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">7:00 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">7:15 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">7:30 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">7:45 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">8:00 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">8:15 pm</Text>
              </TimeWrapper>
              <TimeWrapper>
                <Text id="cf">8:30 pm</Text>
              </TimeWrapper>
            </layouts.EvenGrid>
          </Wrapper>
        </Box>
      </Grid>
    </Box>
  );
};

const TimeWrapper = styled(Box)`
  cursor: pointer;
  border-radius: 40px;
  padding: 10px;
  text-align: center;
  border: 1px solid black;
  #cf {
    color: ${(props) => props.isSelected && "white"};
  }
  background-color: ${(props) => props.isSelected && "black"};
  :hover {
    background-color: black;
    #cf {
      color: white;
    }
  }
`;

const Wrapper = styled(Box)`
  white-space: nowrap;
  padding: 0rem 6rem;
`;

const DropdownText = styled(Text)`
  display: inline-block;
  position: relative;
  cursor: pointer;
  :after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: black;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
  :hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;
const Para = styled(Box)`
  margin-top: 1rem;
  font-weight: 700;
  font-size: 0.75rem;
`;
const AddressPa = styled(Box)`
  color: #111;
  padding-bottom: 1.5rem;
  border-bottom: solid 1px #dfdfdf;
  font-size: 0.75rem;
`;
