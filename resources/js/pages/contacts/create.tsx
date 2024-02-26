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

import { ICompany, IContact } from "@/interfaces";

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
    name: string;
    email: string;
    phone_number: string;
    type: string;
    company_id?: number;
};

export const ContactCreatePage = ({ isOverModal }: Props) => {
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
        resource: "contacts",
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

    const { selectProps } = useSelect<ICompany>({
        resource: "companies",
        optionLabel: "company_name",
        optionValue: "id"
    })

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
            title={t("contacts.form.add")}
            width={512}
            closeIcon={<LeftOutlined />}
        >
            <Form
                {...formProps}
                layout="vertical"
                onFinish={async (values) => {
                    try {
                        const data = await onFinish({
                            name: values.name,
                            email: values.email,
                            phone_number: values.phone_number,
                            type: values.type,
                            company_id: values.company_id
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
                    label={t("contacts.fields.name")}
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("contacts.fields.email")}
                    name="email"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("contacts.fields.phone_number")}
                    name="phone_number"
                    rules={[{required: true}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("contacts.fields.type")}
                    name="type"
                    rules={[{required: true}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("contacts.fields.company")}
                    name="company_id"
                    // rules={[{required: true}]}
                >
                    <Select
                        style={{ width: 300 }}
                        {...selectProps}
                    />
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
