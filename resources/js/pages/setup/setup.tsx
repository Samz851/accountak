import { Create, List, SaveButton, useStepsForm } from "@refinedev/antd"
import { Button, Form, Row, Steps } from "antd"
import { useState } from "react";
import { FormList } from "./formList";
import { IOptions } from "@/interfaces";
import { HttpError } from "@refinedev/core";

export const SetupPage = () => {
  const { current, gotoStep, stepsProps, formProps, saveButtonProps, onFinish } =
    useStepsForm<IOptions, HttpError, IOptions>(
      {
        action: "create",
        resource: "options",
        submit: (values) => {
          const data = {...values} as any;
          if (data.hasOwnProperty('fiscal_year_start') ) data.fiscal_year_start = data.fiscal_year_start.format('YYYY/MM/DD').toString();
          onFinish(data);
        }
      }
    );
// const [current, setCurrent] = useState(0);
    return (
      <Create
      footerButtons={
        <>
          {current > 0 && (
            <Button
              onClick={() => {
                gotoStep(current - 1);
              }}
            >
              Previous
            </Button>
          )}
          {current < FormList.length - 1 && (
            <Button
              onClick={() => {
                gotoStep(current + 1);
              }}
            >
              Next
            </Button>
          )}
          {current === FormList.length - 1 && (
            <SaveButton {...saveButtonProps} />
          )}
        </>
      }
    >
      <Steps {...stepsProps}>
        <Steps.Step title="About Post" />
        <Steps.Step title="Content" />
        <Steps.Step title="Contents" />
      </Steps>

      <Form 
        {...formProps}
        layout="vertical"
        style={{ marginTop: 30 }}
        // onFinish={async (values) => {
        //   try {
        //     // if (values.hasOwnProperty('fiscal_year_start') ) values.fiscal_year_start = values.fiscal_year_start.format('YYYY/MM/DD').toString();
        //     console.log(values);
        //     const data = await (values);
        //   } catch (error) {
        //     console.log(error);
        //   }
        // }}
      >
        {FormList[current]}
      </Form>
    </Create>
    )
}