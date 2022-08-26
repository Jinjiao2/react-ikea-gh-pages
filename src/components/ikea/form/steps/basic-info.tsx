import React from "react";

import { Box, Link as TidbitsLink, Text } from "@tidbits/react-tidbits";

import { ValidatedInput } from "../../../shared-library/src/tidbits/forms/validated-input";
import { REGEX } from "../../../shared-library/src/tidbits/helpers";

const numberErrorMessage = "Must only have numbers";

export const BasicInfoStep = () => {
  return (
    <Box>
      <Text textStyle="h4Emph" mb="spacer15">
        Enter your order or receipt number
      </Text>
      <ValidatedInput
        autoFocus
        label="Order or receipt number"
        name="name"
        placeholder=""
        validationOptions={{
          required: "Number is required.",
          pattern: {
            value: REGEX.NUMBER,
            message: numberErrorMessage,
          },
        }}
      />

      <Text textStyle="bodyRegular" mt="spacer30">
        E.g 1234567 0r 123.456.789
      </Text>
    </Box>
  );
};
