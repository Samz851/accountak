import { useLocation, useSearchParams } from "react-router-dom";

import { useModalForm, useSelect } from "@refinedev/antd";
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
    Switch,
    TreeSelect,
    Typography,
} from "antd";

import { ICompany } from "@/interfaces";

import { useAccountTypesSelect } from "@/hooks/useAccountTypesSelect";
import { useAccountsSelect } from "@/hooks/useAccountsSelect";
import { useState, useEffect } from "react";
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

export const CompanyCreatePage = ({ isOverModal }: Props) => {
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

    const { formProps, modalProps, close, onFinish } = useModalForm<ICompany, HttpError, FormValues
    >({
        action: "create",
        defaultVisible: true,
        resource: "companies",
        redirect: false,
        warnWhenUnsavedChanges: !isOverModal,
    });

    // const { data: typesData, isLoading: typesIsLoading } = useAccountTypesSelect();
    // const { queryResult: accountsQueryResult } = useSelect<IAccount>({
    //     resource: "accounts",
    //     optionLabel: "account_name",
    //     optionValue: "id"
    // });

    // const accountsOptions = accountsQueryResult.data?.data.map((item) => ({
    //     label: item.account_name,
    //     value: item.id,
    // })) ?? [];

    // const { selectProps: taxesSelectProps } = useSelect<ITax>({
    //     resource: "taxes",
    //     optionLabel: "name",
    //     optionValue: "id"
    // })

    return (
        <Modal
            {...modalProps}
            mask={!isOverModal}
            onCancel={() => {
                close();
                go({
                    to:
                        searchParams.get("to") ??
                        getToPath({
                            action: "list",
                        }) ??
                        "",
                    query: {
                        to: undefined,
                    },
                    options: {
                        keepQuery: true,
                    },
                    type: "replace",
                });
            }}
            title={t("companies.form.add")}
            width={512}
            closeIcon={<LeftOutlined />}
        >
            <Form
                {...formProps}
                layout="vertical"
                onFinish={async (values) => {
                    try {
                        const data = await onFinish({
                            company_name: values.company_name,
                            currency: values.currency,
                            contact_information: values.contact_information,
                            address: values.address
                        });
                        close();
                        go({
                            to:
                                searchParams.get("to") ??
                                getToPath({
                                    action: "list",
                                }) ??
                                "",
                            query: {
                                to: undefined,
                            },
                            options: {
                                keepQuery: true,
                            },
                            type: "replace",
                        });

                        // const createdAccount = (data as CreateResponse<IAccount>)
                        //     ?.data;

                        // if ((values.contacts ?? [])?.length > 0) {
                        //     await createManyMutateAsync({
                        //         resource: "contacts",
                        //         values:
                        //             values.contacts?.map((contact) => ({
                        //                 ...contact,
                        //                 companyId: createdCompany.id,
                        //                 salesOwnerId:
                        //                     createdCompany.salesOwner.id,
                        //             })) ?? [],
                        //         successNotification: false,
                        //     });
                        // }

                        // go({
                        //     to: searchParams.get("to") ?? pathname,
                        //     query: {
                        //         companyId: createdCompany.id,
                        //         to: undefined,
                        //     },
                        //     options: {
                        //         keepQuery: true,
                        //     },
                        //     type: "replace",
                        // });
                    } catch (error) {
                        Promise.reject(error);
                    }
                }}
            >
                <Form.Item
                    label={t("companies.fields.company_name")}
                    name="company_name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Please enter company name" />
                </Form.Item>
                <Form.Item
                    label={t("companies.fields.currency")}
                    name="currency"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("companies.fields.contact_information")}
                    name="contact_information"
                    rules={[{required: true}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("companies.fields.address")}
                    name="address"
                    rules={[{required: true}]}
                >
                    <Input />
                </Form.Item>
                {/* <Form.List name="contacts">
                    {(fields, { add, remove }) => (
                        <Space direction="vertical">
                            {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={12} align="middle">
                                    <Col span={11}>
                                        <Form.Item
                                            noStyle
                                            {...restField}
                                            name={[name, "name"]}
                                        >
                                            <Input
                                                addonBefore={<UserOutlined />}
                                                placeholder="Contact name"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={11}>
                                        <Form.Item
                                            noStyle
                                            name={[name, "email"]}
                                        >
                                            <Input
                                                addonBefore={<MailOutlined />}
                                                placeholder="Contact email"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>
                                        <Button
                                            icon={<DeleteOutlined />}
                                            onClick={() => remove(name)}
                                        />
                                    </Col>
                                </Row>
                            ))}
                            <Typography.Link onClick={() => add()}>
                                <PlusCircleOutlined /> Add new contacts
                            </Typography.Link>
                        </Space>
                    )}
                </Form.List> */}
            </Form>
        </Modal>
    );
};
