import { TidbitsTheme } from "../../../../shared/hooks/tidbits";

type GetColorsOptions = {
  index: number;
  activeStep: number;
  isPrerequisite: boolean;
  isActive: boolean;
  isTouched: boolean;
  hasErrors: boolean;
};

export const getStepColors = ({
  index,
  activeStep,
  isPrerequisite,
  isTouched,
  isActive,
  hasErrors,
}: GetColorsOptions) => {
  let bgColor: keyof TidbitsTheme["colors"] = "ctrlDisabled";
  let fontColor: keyof TidbitsTheme["colors"] = "ctrlDisabled";

  if (isPrerequisite || (!isTouched && !isActive)) {
    return { bgColor, fontColor };
  }

  if (hasErrors && !isActive) {
    bgColor = fontColor = "error";
  } else if (activeStep > index) {
    bgColor = "success";
    fontColor = "info";
  } else if (isActive) {
    bgColor = fontColor = "label";
  }

  return { bgColor, fontColor };
};
