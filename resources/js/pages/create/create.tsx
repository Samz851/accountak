import { Outlet, useLocation, useSearchParams } from "react-router-dom";

import { Create, SaveButton, UseFormReturnType, useForm, useModalForm, useSelect, useStepsForm } from "@refinedev/antd";
import {
    CreateResponse,
    HttpError,
    useBack,
    useCreateMany,
    useGetToPath,
    useGo,
    useResource,
    useTranslate
} from "@refinedev/core";
// import { GetFields, GetVariables } from "@refinedev/nestjs-query";

import {
    DeleteOutlined,
    LeftOutlined,
    MailOutlined,
    PlusCircleOutlined,
    RollbackOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    Button,
    Col,
    Form,
    FormInstance,
    FormProps,
    Input,
    InputNumber,
    List,
    Modal,
    Row,
    Select,
    Space,
    Steps,
    Switch,
    Tooltip,
    TreeSelect,
    Typography,
} from "antd";

import { CreateContextType, CreateFormPropsType } from "@/interfaces";

import { useAccountTypesSelect } from "@/hooks/useAccountTypesSelect";
import { useAccountsSelect } from "@/hooks/useAccountsSelect";
import { useState, useEffect, useMemo, useCallback } from "react";
import { FormList } from "./formList";
import { useStyles } from "./styled";
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

// type CreateFormPropsType = {
//   form: FormInstance;
//   formProps: FormProps;
//   goToForm: (resource: string) => void;
// }

// type ResourceInterface<> = 

export const CreateGeneralPage = () => {
  const { resource } = useResource();
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const go = useGo();
    const t = useTranslate();
    const back = useBack();
    const [ selectedCreditAccount, setSelectedCreditAccount ] = useState<number>(0);
    const [ selectedDebitAccount, setSelectedDebitAccount ] = useState<number>(0);
    const [ openForms, setOpenForms ] = useState<string[]>([]);
    // const createForm = useForm(resource);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ createForms, setCreateForms ] = useState<CreateFormPropsType[]>([]);
    const { styles } = useStyles();
    // const getFormProps = useCallback((): CreateFormPropsType => {
    //   // if (resource) {
    //     const { onFinish, form, formProps, formLoading } = useForm({
    //       action: 'create',
    //       resource: resource?.name,
    //     })
    //     return {
    //       form,
    //       formProps: {
    //         ...formProps, 
    //         name: resource?.name
    //       }, 
    //       goToForm: goToForm,
    //       onFinish: onFinish,
    //       formLoading: formLoading
    //     }
    //   // }

    // }, [current]);
    // useEffect(() => {
    //   if ( ! createForms.some( (form) => form.formProps.name === resource?.name) ) {
    //     const { onFinish, form, formProps, formLoading, goToForm } = getFormProps()
    //     setCreateForms([
    //         ...createForms,
    //         {
    //           form,
    //           formProps: {
    //             ...formProps, 
    //             name: resource?.name
    //           }, 
    //           goToForm: goToForm,
    //           onFinish: onFinish,
    //           formLoading: formLoading
    //         }]);
    //     setLoading(formLoading);
    //   }
    // }, [ current ]);

    // const CurrentFormComponent: JSX.Element = useMemo(() => {
    //   const createFormProps: CreateFormPropsType | undefined = createForms.find(form => form.formProps.name === resource?.name);
    //   if ( createFormProps !== undefined ) {
    //     return FormList[current](createFormProps);
    //   }
    // }, [ current, loading ] );

    // const goToForm = (resource: string) => {
    //   setCurrent(resource);
    //   // getToPath(pathname.replace(current, resource));
    // }
    // const onChangeType = (newValue: string) => {
    //     console.log(newValue);
    //     setTypeValue(newValue);
    // };
    // const onChangeParent = (newValue: string) => {
    //     console.log(newValue);
    //     setParentValue(newValue);
    // };

    // const { current,
    //     gotoStep,
    //     stepsProps,
    //     formProps,
    //     saveButtonProps,
    //     queryResult, onFinish } = useStepsForm<ITransaction, HttpError, ITransaction
    // >({
    //     action: "create",
    //     warnWhenUnsavedChanges: true
    // });

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
        <List
          className={styles.wrapper}
          header={
            <Row justify="space-between">
            {
              openForms.map((form, i) => (
                <Col key={i}>
                  <Typography.Title level={4}>{form.toUpperCase()}</Typography.Title>
                </Col>
              ))
            }
            <Col flex="0 1 100px">
                <Tooltip title="Back" >
                  <Button 
                    icon={<RollbackOutlined />} 
                    onClick={() => back()}
                    type="primary"
                    size="large"
                  />
                </Tooltip>
              </Col>
          </Row>

          }
        >

          <Row justify="center">
            <Col span={24}>
              <Outlet context={[openForms, setOpenForms] satisfies CreateContextType}/>
            </Col>
            {/* {CurrentFormComponent} */}
          </Row>

            {/* <Form {...formProps} layout="vertical"> */}
            {/* </Form> */}
        </List>
        
        // <h1>Hello</h1>
    );
};
