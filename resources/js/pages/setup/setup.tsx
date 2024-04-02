import { List } from "@refinedev/antd"
import { Button, Form, Row, Steps } from "antd"
import { useState } from "react";
import { FormList } from "./formList";

export const SetupPage = () => {
const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
    return (
        <List
            headerButtons={(props) => (
                <>
                  {current > 0 && (
                    <Button
                      onClick={() => {
                        prev();
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  {current < FormList.length - 1 && (
                    <Button
                      onClick={() => {
                        next();
                      }}
                    >
                      Next
                    </Button>
                  )}
                  {current === FormList.length - 1 && (
                    <Button />
                  )}
                </>
            )}
            

        >
            <Row>
                <Steps>
                    <Steps.Step
                        title="transaction"
                    />
                    <Steps.Step
                        title="Branch"
                    />
                    <Steps.Step
                        title="account"
                    />
                </Steps>
            </Row>
            <Row>
                <Form layout="vertical">
                    {FormList[current]}
                </Form>
            </Row>
            

        </List>
    )
}