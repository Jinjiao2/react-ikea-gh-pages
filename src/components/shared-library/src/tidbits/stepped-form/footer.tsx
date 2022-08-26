import styled from "styled-components";

import React from "react";
import { useFormState } from "react-hook-form";

import { Box, Button, InlineSpinner } from "@tidbits/react-tidbits";
import { SCHEME_LIGHT } from "@tidbits/react-tidbits/theme";

import { Step } from "./types";

type SteppedFormFooterProps<FieldValues> = {
  activeStep: number;
  prerequisiteStep?: Step<FieldValues>;
  steps: Step<FieldValues>[];
  cancel: () => void;
  next: () => void;
  back: () => void;
  isLoading?: boolean;
};

export function SteppedFormFooter<FieldValues>({
  activeStep,
  prerequisiteStep,
  steps,
  back,
  cancel,
  next,
  isLoading,
}: SteppedFormFooterProps<FieldValues>) {
  const isPrerequisite = prerequisiteStep && activeStep === -1;
  const isFirstStep = activeStep === 0;
  const isLastStep = steps.length - 1 === activeStep;
  const isSkippable = !isPrerequisite && steps[activeStep].skippable;
  const step = isPrerequisite ? prerequisiteStep : steps[activeStep];
  const { isValid, isSubmitting } = useFormState();

  return (
    <Container>
      <Actions>
        {((isFirstStep && !prerequisiteStep) || isPrerequisite) && (
          <Button variant="standard" type="button" onClick={cancel}>
            Cancel
          </Button>
        )}
        {((prerequisiteStep && !isPrerequisite) ||
          (!prerequisiteStep && !isFirstStep)) && (
          <Button variant="standard" type="button" onClick={back}>
            Back
          </Button>
        )}
      </Actions>

      <Actions>
        {isSkippable && (
          <Button variant="standard" type="button" onClick={next}>
            Skip
          </Button>
        )}

        {isLastStep ? (
          <button type="submit">
            <Button
              primary
              as="a"
              variant="standard"
              disabled={!isValid || isSubmitting || isLoading}
            >
              {step.submitText || "Submit"}
              <InlineSpinner
                bg="ctrlDisabled"
                ml="spacer10"
                visible={isLoading}
              />
            </Button>
          </button>
        ) : (
          <Button primary type="button" variant="standard" onClick={next}>
            {step.submitText || "Continue"}
          </Button>
        )}
      </Actions>
    </Container>
  );
}

const Container = styled(Box)`
  align-items: center;
  border-top: 1px solid;
  border-color: ${({ theme: { colors } }) =>
    colors.SCHEME === SCHEME_LIGHT ? colors.keylineLight : colors.keylineDark};
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
`;

const Actions = styled(Box)`
  display: flex;
  gap: 8px;
`;
