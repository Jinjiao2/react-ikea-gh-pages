import React, { memo } from "react";
import { useForm } from "react-hook-form";

import { SteppedForm } from "../../shared-library/src/tidbits/stepped-form";
import {
  Step,
  Stepped,
} from "../../shared-library/src/tidbits/stepped-form/types";

import { useFormPersist } from "../../shared/hooks/common";

import {
  BasicInfoStep,
  ProductsStep,
  ContactStep,
  ConfigurationStep,
  ReviewStep,
} from "./steps";
import { LakehouseFormData } from "./types";

export const LakehouseForm = memo(() => {
  const initalState: Stepped & Partial<LakehouseFormData> = {
    // because we have prerequisite step
    activeStep: 0,
    addressType: "Personal",
  };
  const [persistState, setPersistState] = useFormPersist(
    "lakehouse",
    initalState
  );

  const contextValues = useForm<LakehouseFormData & Stepped>({
    mode: "onBlur",
    defaultValues: persistState,
  });

  const steps: Step<LakehouseFormData>[] = [
    {
      key: "Order Number",
      fields: ["name"],
      children: <BasicInfoStep />,
    },
    {
      key: "Products to Return",
      fields: ["articleNumber"],
      children: <ProductsStep />,
    },
    {
      key: "Contact Details",
      fields: ["Firstname", "Lastname", "Email"],
      children: <ContactStep />,
    },
    {
      key: "Schedule",
      fields: [],
      skippable: true,
      children: <ConfigurationStep />,
    },
    {
      key: "Review",
      children: <ReviewStep />,
    },
  ];

  const handleSubmit = () => {};

  return (
    <SteppedForm<LakehouseFormData & Stepped>
      contextValues={contextValues}
      steps={steps}
      updatePersist={setPersistState}
      onSubmit={handleSubmit}
      onCancel={() => {
        // eslint-disable-next-line no-console
        console.log("onCancel");
      }}
      dataTestId="lakehouse-create-form"
    />
  );
});
