import { useLocation, useSearchParams } from "react-router-dom";

import { Create, SaveButton, useModalForm, useSelect, useStepsForm } from "@refinedev/antd";
import {
    CreateResponse,
    HttpError,
    useCreateMany,
    useGetToPath,
    useGo,
    useTranslate
} from "@refinedev/core";
// import { GetFields, GetVariables } from "@refinedev/nestjs-query";

import {
    DeleteOutlined,
    LeftOutlined,
    MailOutlined,
    PlusCircleOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
    Space,
    Steps,
    Switch,
    TreeSelect,
    Typography,
} from "antd";

import { ICompany, ITransaction } from "@/interfaces";

import { useAccountTypesSelect } from "@/hooks/useAccountTypesSelect";
import { useAccountsSelect } from "@/hooks/useAccountsSelect";
import { useState, useEffect } from "react";
import { FormList } from "./formList";
// import { SelectOptionWithAvatar } from "@/components";
// import { Company } from "@/graphql/schema.types";
// import {
//     CreateCompanyMutation,
//     CreateCompanyMutationVariables,
// } from "@/graphql/types";
// import { useUsersSelect } from "@/hooks/useUsersSelect";

// import { COMPANY_CREATE_MUTATION } from "./queries";

type Props = {
    isOverModal?: boolean;
};

type FormValues = {
    company_name: string;
    currency: string;
    address: string;
    contact_information?: string;
};

export const CreateGeneralPage = ({ isOverModal }: Props) => {
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const go = useGo();
    const t = useTranslate();
    const [ selectedCreditAccount, setSelectedCreditAccount ] = useState<number>(0);
    const [ selectedDebitAccount, setSelectedDebitAccount ] = useState<number>(0);

    // const onChangeType = (newValue: string) => {
    //     console.log(newValue);
    //     setTypeValue(newValue);
    // };
    // const onChangeParent = (newValue: string) => {
    //     console.log(newValue);
    //     setParentValue(newValue);
    // };

    const { current,
        gotoStep,
        stepsProps,
        formProps,
        saveButtonProps,
        queryResult, onFinish } = useStepsForm<ITransaction, HttpError, ITransaction
    >({
        action: "create",
        warnWhenUnsavedChanges: true
    });

    // const { data: typesData, isLoading: typesIsLoading } = useAccountTypesSelect();
    // const { queryResult: accountsQueryResult } = useSelect<IAccount>({
    //     resource: "accounts",
    //     optionLabel: "name",
    //     optionValue: "id"
    // });

    // const accountsOptions = accountsQueryResult.data?.data.map((item) => ({
    //     label: item.name,
    //     value: item.id,
    // })) ?? [];

    // const { selectProps: taxesSelectProps } = useSelect<ITax>({
    //     resource: "taxes",
    //     optionLabel: "name",
    //     optionValue: "id"
    // })

    return (
        <Create 
            saveButtonProps={saveButtonProps}
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
            <Form {...formProps} layout="vertical">
                {FormList[current]}
            </Form>
        </Create>
        
        // <h1>Hello</h1>
    );
};
