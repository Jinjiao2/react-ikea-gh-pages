import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useScratch } from "react-use";
import { Modal, Button, Icons, Text } from "@tidbits/react-tidbits";
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
  const [isHidden, setIsHidden] = useState(true);
  const [persistState, setPersistState] = useFormPersist(
    "lakehouse",
    initalState
  );

  const handleContinue = () => {
    setIsHidden(true);
    setPersistState(initalState);
  };
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
      fields: ["city"],
      skippable: true,
      children: <ConfigurationStep />,
    },
    {
      key: "Review",
      children: <ReviewStep />,
    },
  ];

  const handleSubmit = () => {
    console.log("here");
    setIsHidden(false);
  };

  return (
    <>
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
      <Modal.Window
        open={!isHidden}
        // closeModal={hide}
        // focusableRef={ref}
        closeOnEscape={true}
        closeOnClickOutside={true}
      >
        <Modal.Content>
          <Modal.Header>
            <Icons.AlertFilledIcon
              name="adir"
              width="25px"
              color="info"
              mr="10px"
            />
            Thank you! Your submission is confirmed.{" "}
          </Modal.Header>
          <Modal.Body>
            <Text mb="20px">
              An SMS and email have been sent to you, which contain a link to a
              barcorde.{" "}
            </Text>
            <Text textStyle="bodyEmph" mb="10px">
              Upon arrival to the IKEA store.
            </Text>
            <Text>
              Make your way to the Exchanges and returns department.Simply show
              the barcode along with the articles you wish to return to the IKEA
              co-worker and they will be happy to support you. Thank you for
              preparing your return in advance.
            </Text>
          </Modal.Body>
        </Modal.Content>
        <Modal.Footer>
          <Button large primary type="button" onClick={handleContinue}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal.Window>
    </>
  );
});
