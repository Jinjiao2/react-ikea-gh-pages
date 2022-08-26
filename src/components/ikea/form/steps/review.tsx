import styled from "styled-components";

import React from "react";
import { useFormContext } from "react-hook-form";
import imageT from "../../../shared/assets/p1.png";
import {
  Box,
  Text,
  layouts,
  Icons,
  Heading,
  ArtworkGrid,
  HeadingLink,
  Artwork,
  Input,
} from "@tidbits/react-tidbits";

export const ReviewStep = () => {
  return (
    <>
      <Text textStyle="h4Regular" mb="20px">
        Last, confirm your in-store return details
      </Text>
      <Container>
        <Info>
          <Box>
            {" "}
            <Icons.CalendarIcon name="adir" width="10px" mr="3px" />
            <Text as="span" textStyle="bodyRegular">
              Return appointment date and time
            </Text>
          </Box>
          <Text textStyle="h4Medium">
            {" "}
            {new Date().toISOString().split("T")[0] + ",   11:00 AM"}
          </Text>
        </Info>
        <Info>
          <Text textStyle="bodyRegular">
            {" "}
            <Icons.MapIcon name="adir" width="10px" mr="3px" />
            <Text as="span" textStyle="bodyRegular">
              IKEA Coquitlam
            </Text>
          </Text>
          <Text textStyle="h4Medium">1000 Lougheed Highway, Coquitlam</Text>
        </Info>
        <Line />
        <Heading.H3 sb="standard">Return items</Heading.H3>

        <ArtworkGrid>
          <ArtworkGrid.Item height="148px">
            <ArtworkGrid.Artwork height="148px" width="148px">
              <Artwork.Square src={imageT} />
            </ArtworkGrid.Artwork>
            <ArtworkGrid.Data height="148px">
              {/* <ArtworkGrid.Title>
              <HeadingLink href='#'>LÅNGFJÄLL</HeadingLink>
            </ArtworkGrid.Title> */}
              <HeadingLink href="#">LÅNGFJÄLL</HeadingLink>
              <Text mt="5px" mb="10px">
                Duvet cover
              </Text>
              <TextLabel>503.324.36</TextLabel>
              <Text>Qty: 2</Text>
            </ArtworkGrid.Data>
          </ArtworkGrid.Item>
        </ArtworkGrid>
        {/* <Info>
          <Text textStyle="bodyRegular">Compute</Text>
          <Text textStyle="h4Medium">{getValues("namespaceType") || "–"}</Text>
        </Info>

        <Info>
          <Text textStyle="bodyRegular">Acscess Control</Text>
          <layouts.EvenGrid cols={[1, 2, 4]}>
            <GridItem>
              <Text textStyle="h5Regular">Admin</Text>
              <Text textStyle="h4Medium">
                {getValues("admins")?.join(", ")}
              </Text>
            </GridItem>
            <GridItem>
              <Text textStyle="h5Regular">Maintain</Text>
              <Text textStyle="h4Medium">–</Text>
            </GridItem>
            <GridItem>
              <Text textStyle="h5Regular">Developer</Text>
              <Text textStyle="h4Medium">–</Text>
            </GridItem>
            <GridItem>
              <Text textStyle="h5Regular">Report</Text>
              <Text textStyle="h4Medium">–</Text>
            </GridItem>
          </layouts.EvenGrid>
        </Info> */}
      </Container>
    </>
  );
};

const Container = styled(Box)`
  display: grid;
  gap: 30px;
`;

const Info = styled(Box)`
  display: grid;
  gap: 12px;
`;

const GridItem = styled(Info)`
  border-right: 1px solid ${({ theme: { colors } }) => colors.keyline};

  &:last-of-type {
    border: none;
  }
`;
const Line = styled.hr`
  color: rgba(0, 0, 0, 0.65);
  width: 100%;
`;
const TextLabel = styled(Text)`
  white-space: nowrap;
  background-color: #f5f5f5;
  padding: 0.15rem 0.75rem;
  font-weight: 700;
  color: black;
  line-height: 1.25;
  font-size: 0.75rem;
  margin-bottom: 10px;
`;
