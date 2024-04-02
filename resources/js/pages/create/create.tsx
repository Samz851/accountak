import { useLocation, useSearchParams } from "react-router-dom";

import { Create, SaveButton, UseFormReturnType, useForm, useModalForm, useSelect, useStepsForm } from "@refinedev/antd";
import {
    CreateResponse,
    HttpError,
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
    TreeSelect,
    Typography,
} from "antd";

import { CreateFormPropsType } from "@/interfaces";

import { useAccountTypesSelect } from "@/hooks/useAccountTypesSelect";
import { useAccountsSelect } from "@/hooks/useAccountsSelect";
import { useState, useEffect, useMemo, useCallback } from "react";
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
    const [ selectedCreditAccount, setSelectedCreditAccount ] = useState<number>(0);
    const [ selectedDebitAccount, setSelectedDebitAccount ] = useState<number>(0);
    const [ current, setCurrent ] = useState<string>(resource?.name || '');
    const createForm = useForm(resource);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ createForms, setCreateForms ] = useState<CreateFormPropsType[]>([]);

    const getFormProps = useCallback((): CreateFormPropsType => {
      // if (resource) {
        const { onFinish, form, formProps, formLoading } = useForm({
          action: 'create',
          resource: resource?.name,
        })
        return {
          form,
          formProps: {
            ...formProps, 
            name: resource?.name
          }, 
          goToForm: goToForm,
          onFinish: onFinish,
          formLoading: formLoading
        }
      // }

    }, [current]);
    useEffect(() => {
      if ( ! createForms.some( (form) => form.formProps.name === resource?.name) ) {
        const { onFinish, form, formProps, formLoading, goToForm } = getFormProps()
        setCreateForms([
            ...createForms,
            {
              form,
              formProps: {
                ...formProps, 
                name: resource?.name
              }, 
              goToForm: goToForm,
              onFinish: onFinish,
              formLoading: formLoading
            }]);
        setLoading(formLoading);
      }
    }, [ current ]);

    const CurrentFormComponent: JSX.Element = useMemo(() => {
      const createFormProps: CreateFormPropsType | undefined = createForms.find(form => form.formProps.name === resource?.name);
      if ( createFormProps !== undefined ) {
        return FormList[current](createFormProps);
      }
    }, [ current, loading ] );

    const goToForm = (resource: string) => {
      setCurrent(resource);
      // getToPath(pathname.replace(current, resource));
    }
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
        <List>
          <Row>
            {CurrentFormComponent}
          </Row>

            {/* <Form {...formProps} layout="vertical"> */}
            {/* </Form> */}
        </List>
        
        // <h1>Hello</h1>
    );
};
