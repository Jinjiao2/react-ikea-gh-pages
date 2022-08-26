import noop from "lodash/noop";
import styled, { css } from "styled-components";

import { useFormContext } from "react-hook-form";

import {
  Form,
  Input,
  Box,
  Link as TidbitsLink,
  Text,
} from "@tidbits/react-tidbits";

import {
  RadioButton,
  RadioGroup,
} from "../../../shared-library/src/tidbits/forms/radio-group";

import { ValidatedInput } from "../../../shared-library/src/tidbits/forms/validated-input";

import Person from "../../../shared/assets/address-book-svgrepo-com.svg";
import Work from "../../../shared/assets/bank-svgrepo-com.svg";

import { LakehouseFormData } from "../types";

export const ContactStep = () => {
  const contextValues = useFormContext<LakehouseFormData>();

  return (
    <Box>
      <Text textStyle="h4Emph" mb="spacer15">
        Enter your details
      </Text>
      <RadioGroup
        name="addressType"
        label="Type"
        layout="vertical"
        styleOverrides={{
          cardWrapper: styles.cardWrapper,
        }}
        selectedValue={contextValues.getValues().addressType}
        isRequired
      >
        <RadioButton variant="card" value={"personal"} onChange={noop}>
          <CardImage src={Person} alt="AwsUS" />
          <Text mt="spacer10" textStyle="bodyMedium">
            Private person
          </Text>
        </RadioButton>
        <RadioButton variant="card" value={"company"} onChange={noop}>
          <CardImage src={Work} alt="AwsUS" />
          <Text mt="spacer10" textStyle="bodyMedium">
            Company
          </Text>
        </RadioButton>
      </RadioGroup>

      <ValidatedInput
        label="First name"
        name="Firstname"
        validationOptions={{
          required: true,
        }}
      />
      <ValidatedInput
        label="Last name"
        name="Lastname"
        validationOptions={{
          required: true,
        }}
      />
      <ValidatedInput
        label="E-mail"
        name="Email"
        validationOptions={{
          required: true,
        }}
      />
      <ValidatedInput
        label="Mobile"
        name="Mobile"
        validationOptions={{
          required: true,
        }}
      />
      <Form.Label inline sb="spacer15">
        <Input.Checkbox /> I have read and agree to the Terms & Conditions and
        Privacy Policy
      </Form.Label>
    </Box>
  );
};

const CardImage = styled.img`
  width: 62px;
`;

const styles = {
  cardWrapper: css`
    display: grid;
    grid-template-columns: 240px 240px 240px 240px;
    column-gap: 30px;
  `,
};
