import has from "lodash/has";
import styled from "styled-components";

import React from "react";
import { useFormState } from "react-hook-form";

import { Breadcrumbs, Box, Text } from "@tidbits/react-tidbits";
import { SCHEME_LIGHT } from "@tidbits/react-tidbits/theme";

import { useTidbitsTheme } from "../../../../shared/hooks/tidbits";

import { getStepColors } from "./helpers";
import { Step } from "./types";

type SteppedFormHeaderProps<FieldValues> = {
  activeStep: number;
  onClick: (currentStep: number) => void;
  steps: Step<FieldValues>[];
};

export function SteppedFormHeader<FieldValues>({
  activeStep,
  steps,
  onClick,
}: SteppedFormHeaderProps<FieldValues>) {
  const theme = useTidbitsTheme();
  const { errors, touchedFields } = useFormState<FieldValues>();
  const isPrerequisite = activeStep === -1;

  return (
    <Container>
      <Breadcrumbs>
        {steps.map(({ key, fields = [] }, index) => {
          const hasErrors = fields.some((field) => has(errors, field));
          const isTouched = fields.some((field) => has(touchedFields, field));
          const isActive = activeStep === index;

          const { bgColor, fontColor } = getStepColors({
            index,
            activeStep,
            isActive,
            isTouched,
            hasErrors,
            isPrerequisite,
          });

          return (
            <Breadcrumbs.Crumb
              key={key}
              data-testid={`stepped-form-header-step-${index}`}
              onClick={() => onClick(index)}
              clickable
            >
              <StepCount bg={theme.colors[bgColor]}>{index + 1}</StepCount>{" "}
              <Text textStyle="bodyViewSRegular" color={fontColor}>
                {key}
              </Text>
            </Breadcrumbs.Crumb>
          );
        })}
      </Breadcrumbs>
    </Container>
  );
}

const Container = styled(Box)`
  border-bottom: 1px solid;
  border-color: ${(props) => props.theme.colors.keyline};
  padding: 20px 30px;
  border-radius: 20px 20px 0 0;
  background: ${(props) => props.theme.colors.bgPlaceholder};

  & [data-testid^="stepped-form-header-step-"] {
    text-decoration: none;

    svg {
      color: ${({ theme: { colors } }) =>
        colors.SCHEME === SCHEME_LIGHT
          ? colors.keylineLight
          : colors.keylineDark};
      height: 20px !important;
      width: 20px !important;
    }
  }
`;

type StepCountProps = {
  bg: string;
};

const StepCount = styled.span<StepCountProps>`
  background: ${(props) => props.bg};
  border-radius: 50%;
  color: ${({ theme: { colors } }) =>
    colors.SCHEME === SCHEME_LIGHT ? colors.bgLight : colors.bgDark};
  font-size: 9px;
  height: 16px;
  margin-right: 12px;
  text-align: center;
  width: 16px;
`;
