import { Create, List, SaveButton, useStepsForm } from "@refinedev/antd"
import { Button, Form, FormInstance, Row, Space, Steps } from "antd"
import { useEffect, useState } from "react";
import { FormList } from "./formList";
import { IOptions } from "@/interfaces";
import { HttpError } from "@refinedev/core";
import dayjs from "dayjs";
interface SubmitButtonProps {
  form: FormInstance;
}
// const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
//   const [submittable, setSubmittable] = useState<boolean>(false);

//   // Watch all values
//   const values = Form.useWatch([], form);

//   useEffect(() => {
//     form
//       .validateFields({ validateOnly: true })
//       .then(() => setSubmittable(true))
//       .catch(() => setSubmittable(false));
//   }, [form, values]);

//   return (
//     <Button type="primary" htmlType="submit" disabled={!submittable}>
//       {children}
//     </Button>
//   );
// };

export const SetupPage = () => {
  const [ optionsValues, setOptionsValues ] = useState<IOptions>({
    fiscal_cycle: 12,
    fiscal_year_start: dayjs().format('YYYY/MM/DD').toString(),
  })
  const { current, gotoStep, stepsProps, formProps, form, onFinish, saveButtonProps } =
    useStepsForm<IOptions, HttpError, IOptions>(
      {
        action: "edit",
        resource: "options",
        submit: async (values) => {
          try {
                // if (values.hasOwnProperty('fiscal_year_start') ) values.fiscal_year_start = values.fiscal_year_start.format('YYYY/MM/DD').toString();
                console.log(values, optionsValues);
                const data = {...values} as any;
                if (data.hasOwnProperty('fiscal_year_start') ) data.fiscal_year_start = data.fiscal_year_start.format('YYYY/MM/DD').toString();
                if ( data.logo_file?.length ) data.logo_file = data.logo_file[0].originFileObj;
                const formData = new FormData();
                const keys = Object.keys(data);
            
                keys.forEach( key => {
                  console.log(key, data[key]);
                  if ( Array.isArray(data[key]) ) {
                    data[key].map( per => {
                          formData.append(`${key}[]`, per);
                      })
                  } else {
                      formData.append(key, data[key])
                  }
                
                });
                const response = await onFinish(formData as any);
              } catch (error) {
                console.log(error);
              }
        },
        id: 10
      }
    );



  const handleValuesChange = (changedValues, allValues) => {
    console.log(changedValues, allValues);
    setOptionsValues({...optionsValues, ...changedValues});
  }
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
        form={form}
        onFieldsChange={(changedFields, allFields) => { console.log(changedFields, allFields);}}
        onValuesChange={handleValuesChange}
        // onFinish={async (values) => {
        //   try {
        //     // if (values.hasOwnProperty('fiscal_year_start') ) values.fiscal_year_start = values.fiscal_year_start.format('YYYY/MM/DD').toString();
        //     console.log(values);
        //     const data = {...values} as any;
        //     if (data.hasOwnProperty('fiscal_year_start') ) data.fiscal_year_start = data.fiscal_year_start.format('YYYY/MM/DD').toString();
        //     const formData = new FormData();
        //     const keys = Object.keys(data);
        
        //     keys.forEach( key => {
        //       console.log(key, data[key]);
        //       if ( Array.isArray(data[key]) ) {
        //         data[key].map( per => {
        //               formData.append(`${key}[]`, per);
        //           })
        //       } else {
        //           formData.append(key, data[key])
        //       }
            
        //     });
        //     const response = await onFinish(formData as any);
        //   } catch (error) {
        //     console.log(error);
        //   }
        // }}
      >
        {FormList[current]}
        {/* <>
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
            <Form.Item>
            <Space>
              <SubmitButton form={form}>Submit</SubmitButton>
            </Space>
          </Form.Item>
          )}
        </> */}
      </Form>
    </Create>
    )
}