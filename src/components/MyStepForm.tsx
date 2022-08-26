import React from "react";
import { PageHeader, Form, Input } from "antd";
import { StepPanel } from "./StepPanel";

function MyStepForm() {
  const [stepForm] = Form.useForm();

  const Step1Form = () => {
    return (
      <>
        <Form.Item name="field1" label="Field1">
          <Input />
        </Form.Item>
      </>
    );
  };

  const Step2Form = () => {
    return (
      <>
        <Form.Item name="field2" label="Field2">
          <Input />
        </Form.Item>
      </>
    );
  };

  const onFinish = (fieldsValue: any) => {
    const formData = stepForm.getFieldsValue();

    // POST the data to backend and show Notification
    console.log(formData);
  };

  const steps = [
    {
      title: "Step1",
      content: <Step1Form />,
    },
    {
      title: "Step2",
      content: <Step2Form />,
    },
  ];
  return (
    <PageHeader title="Step Form" subTitle="Multi-Step form">
      <Form form={stepForm} onFinish={onFinish}>
        <StepPanel steps={steps} />
      </Form>
    </PageHeader>
  );
}
export { MyStepForm };
