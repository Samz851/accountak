import { useLocation, useSearchParams } from "react-router-dom";

import { useModalForm } from "@refinedev/antd";
import {
    CreateResponse,
    HttpError,
    useCreateMany,
    useGetToPath,
    useGo,
    useList,
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
    Modal,
    Row,
    Select,
    Space,
    TreeSelect,
    Typography,
} from "antd";

import { IAccount, IAccountType } from "@/interfaces";

import { useAccountTypesSelect } from "@/hooks/useAccountTypesSelect";
import { useAccountsSelect } from "@/hooks/useAccountsSelect";
import { useState } from "react";
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
    description: string;
    parent_account_type?: number;
};
// type AccountTypesTree = IAccountType & DataNode;
export const AccountTypeCreatePage = ({ isOverModal }: Props) => {
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const go = useGo();
    const [typeValue, setTypeValue] = useState<string>();
    const [parentValue, setParentValue] = useState<string>();
    const t = useTranslate();
    const initValue = searchParams.get('parent') ?? '';

    const onChangeType = (newValue: string) => {
        setTypeValue(newValue);
    };

    const { formProps, modalProps, close, onFinish } = useModalForm<IAccountType, HttpError, FormValues
    >({
        action: "create",
        defaultVisible: true,
        resource: "account_types",
        redirect: false,
        warnWhenUnsavedChanges: !isOverModal,
    });

    // const { data: typesData, isLoading: typesIsLoading } = useAccountTypesSelect();
    // const { data: accountsData, isLoading: accountsIsLoading } = useAccountsSelect();
    const { data } = useList<IAccountType>({
        resource: "account_types",
        filters: [
            {
                field: 'tree',
                operator: 'eq',
                value: true
            }
        ]
    });

    const accountTypes = data?.data ?? [];
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
            title={t("account_types.form.add")}
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
                            description: values.description,
                            parent_account_type: values.parent_account_type
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
                    label={t("account_types.fields.name")}
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("account_types.fields.description")}
                    name="description"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("account_types.fields.parent_type")}
                    name="parent_account_type"
                    // rules={[{ required: true }]}
                >
                    <TreeSelect
                        style={{ width: '100%' }}
                        // value={typeValue}
                        fieldNames={{label: "title", "value": "key", children: "children"}}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={accountTypes}
                        placeholder="Please select"
                        treeDefaultExpandAll
                        // onChange={onChangeType}
                        allowClear={true}
                        defaultValue={initValue}
                        />

                </Form.Item>
                {/* <Form.Item
                    label={t("accounts.fields.parent_account")}
                    name="parent_account_id"
                >
                    <TreeSelect
                        style={{ width: '100%' }}
                        value={parentValue}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={accountsData?.data}
                        placeholder="Please select"
                        treeDefaultExpandAll
                        onChange={onChangeParent}
                        allowClear={true}
                        />
                </Form.Item> */}
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
