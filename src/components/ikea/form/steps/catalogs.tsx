import styled from "styled-components";

import React, { useState } from "react";

import {
  ArtworkGrid,
  Artwork,
  HeadingLink,
  Box,
  Link as TidbitsLink,
  Text,
} from "@tidbits/react-tidbits";

import { ValidatedInput } from "../../../shared-library/src/tidbits/forms/validated-input";
import { ValidatedSelectDropdown } from "../../../shared-library/src/tidbits/forms/validated-select-dropdown";
import { REGEX } from "../../../shared-library/src/tidbits/helpers";

import imageT from "../../../shared/assets/p1.png";

export const ProductsStep = () => {
  const [showItem, setShowItem] = useState(false);
  const clickAddItem = () => {
    setShowItem(true);
  };
  return (
    <Box>
      <Text textStyle="h4Emph" mb="spacer15">
        What do you want to return
      </Text>
      <ValidatedInput
        autoFocus
        label="Article number"
        name="articleNumber"
        placeholder=""
        validationOptions={{
          required: "Number is required.",
          pattern: {
            value: REGEX.NUMBER,
            message: "Numbers are expected",
          },
        }}
        description="Note:  E.g 1234567 0r 123.456.789"
      />
      <ButtonWrapper
        as="div"
        textStyle="h3Emph"
        bg="black"
        width="20%"
        color="white"
        onClick={clickAddItem}
      >
        + &nbsp; &nbsp; &nbsp; Add Item
      </ButtonWrapper>

      {showItem && (
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
              <ValidatedSelectDropdown
                data-testid="number"
                id="number-dropdown"
                name="number"
                options={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                  { label: "5", value: "5" },
                  { label: "6", value: "6" },
                ]}
                placeholder="1"
                title=""
              />
            </ArtworkGrid.Data>
          </ArtworkGrid.Item>
        </ArtworkGrid>
      )}
      <Text textStyle="bodyRegular" mt="spacer30">
        Please refer the{" "}
        <TidbitsLink href="/" target="_blank" rel="noopener noreferrer">
          {/* documentation */}
          {/* FIXME: add link */}
          link
        </TidbitsLink>{" "}
        for more information about articles.
      </Text>
    </Box>
  );
};

const ButtonWrapper = styled(Box)`
  margin-top: 0.5rem;
  margin-bottom: 1.8rem;
  font-size: 0.75rem;
  border-radius: 64px;
  cursor: pointer;
  text-align: center;
  padding: 3px;
`;
const TextLabel = styled(Text)`
  white-space: nowrap;
  background-color: #f5f5f5;
  padding: 0.15rem 0.75rem;
  font-weight: 700;
  color: black;
  line-height: 1.25;
  font-size: 0.75rem;
`;
