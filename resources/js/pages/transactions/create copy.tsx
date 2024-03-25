import { useLocation, useSearchParams } from "react-router-dom";

import { useModalForm, useSelect } from "@refinedev/antd";
import dayjs from "dayjs";
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
    MinusCircleOutlined,
    PlusCircleOutlined,
    PlusOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    Button,
    Col,
    DatePicker,
    Form,
    Grid,
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

import { IAccount, ITax, ITransaction } from "@/interfaces";

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

type Accounts = {
    id: number;
    amount: number;
}
type FormValues = {
    name: string;
    description: string;
    amount: number;
    debit_accounts: Array<Accounts>;
    credit_accounts: Array<Accounts>;
    notes_pr?: number;
    issue_payment: boolean;
    tax_id: number;
};

export const TransactionCreatePage = ({ isOverModal }: Props) => {
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const go = useGo();
    const t = useTranslate();
    const [ accountsBalanceError, setAccountsBalanceError ] = useState("")
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

    const { form, formProps, modalProps, close, onFinish } = useModalForm<ITransaction, HttpError, FormValues
    >({
        action: "create",
        defaultVisible: true,
        resource: "transactions",
        redirect: false,
        warnWhenUnsavedChanges: !isOverModal,
    });

    // const { data: typesData, isLoading: typesIsLoading } = useAccountTypesSelect();
    const { queryResult: accountsQueryResult } = useSelect<IAccount>({
        resource: "accounts",
        optionLabel: "name",
        optionValue: "id"
    });

    const accountsOptions = accountsQueryResult.data?.data.map((item) => ({
        label: item.name,
        value: item.id,
    })) ?? [];

    const { selectProps: taxesSelectProps } = useSelect<ITax>({
        resource: "taxes",
        optionLabel: "name",
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
            title={t("transactions.form.add")}
            width="90vw"
            closeIcon={<LeftOutlined />}
        >
            <Form
                {...formProps}
                // layout="vertical"
                onFinish={async (values) => {
                    const soFar = form.getFieldsValue();
                    console.log(soFar);
                    let debits = soFar.debit_accounts.reduce((accumulator, current) => accumulator + current.amount, 0);
                    let credits = soFar.credit_accounts.reduce((accumulator, current) => accumulator + current.amount, 0);
                    console.log('totals', debits, credits);
                    if (debits !== credits) {
                        setAccountsBalanceError("error");
                        Promise.reject("Accounts not balanced");
                        // let fins = form.getFieldInstance(["debit_accounts"]);
                        // console.log('f in', fins);
                        // form.setFields({
                        //     credit_accounts: {
                        //         value: soFar.debit_accounts,
                        //         errors: [new Error('Debit Credit not balances')]
                        //     }
                        // })
                    }
                    try {
                        const data = await onFinish({
                            name: values.name,
                            description: values.description,
                            amount: values.amount,
                            debit_accounts: values.debit_accounts,
                            credit_accounts: values.credit_accounts,
                            notes_pr: values.notes_pr,
                            issue_payment: values.issue_payment,
                            tax_id: values.tax_id
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

                    } catch (error) {
                        Promise.reject(error);
                    }
                }}
            >
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={t("transactions.fields.date")}
                            name="date"
                            rules={[{required: true}]}
                        >
                            <DatePicker
                                defaultValue={dayjs()}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"space-between"} gutter={18}>
                    <Col span={8}>
                        <Form.Item
                            label={t("transactions.fields.name")}
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                    <Form.Item
                        label={t("transactions.fields.description")}
                        name="description"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    </Col>
                </Row>
                <Row justify={"space-between"} gutter={18} style={{border: "4px solid black"}}>
                    <Col span={12}>
                        <Typography.Title level={5}>
                            {t("transactions.form.debit")}
                        </Typography.Title>
                        <Row justify={"space-between"} gutter={18} style={{border: "3px solid black"}}>
                            <Col span={16}>
                                <Typography.Title level={5}>
                                    {t("accounts.accounts")}
                                </Typography.Title>
                            </Col>
                            <Col span={8}>
                                <Typography.Title level={5}>
                                    {t("transactions.fields.amount")}
                                </Typography.Title>
                            </Col>
                        </Row>
                        <Form.List
                            name="debit_accounts"
                            rules={[
                                {
                                validator: async (_, debit_accounts) => {
                                    console.log(_, debit_accounts);
                                    if (!debit_accounts || debit_accounts.length < 1) {
                                    return Promise.reject(new Error('At least 1 Debit account'));
                                    }
                                },
                                },
                            ]}
                        >
                            {(fields, {add, remove}, {errors}) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Row key={key} justify={"space-between"} gutter={18} style={{border: "1px dashed black"}}>
                                            <Col span={16}>
                                                <Form.Item
                                                    // label={t("transactions.fields.debit_account")}
                                                    name={[name, 'id']}
                                                    rules={[{required: true}]}
                                                    validateStatus={accountsBalanceError as any}
                                                            >
                                                    <Select
                                                        style={{ width: 300 }}
                                                        onChange={value => setSelectedDebitAccount(value)}
                                                        filterOption={true}
                                                        options={[...accountsOptions?.filter(item => item.value !== selectedCreditAccount)]}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    // label={t("transactions.fields.amount")}
                                                    name={[name, "amount"]}
                                                    rules={[{ required: true }]}
                                                    validateStatus={accountsBalanceError as any}
                                                >
                                                    <InputNumber precision={2} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Col>
                                        </Row>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            {t("transactions.form.add_debit")}
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Col>
                    <Col span={12}>
                        <Typography.Title level={5}>
                            {t("transactions.form.credit")}
                        </Typography.Title>
                        <Row justify={"space-between"} gutter={18} style={{border: "3px solid black"}}>
                            <Col span={16}>
                                <Typography.Title level={5}>
                                    {t("accounts.accounts")}
                                </Typography.Title>
                            </Col>
                            <Col span={8}>
                                <Typography.Title level={5}>
                                    {t("transactions.fields.amount")}
                                </Typography.Title>
                            </Col>
                        </Row>
                        <Form.List
                            name="credit_accounts"
                            rules={[
                                {
                                validator: async (_, credit_accounts) => {
                                    if (!credit_accounts || credit_accounts.length < 1) {
                                    return Promise.reject(new Error('At least 1 Credit account'));
                                    }
                                },
                                },
                            ]}
                        >
                            {(fields, {add, remove}, {errors}) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Row key={key} justify={"space-between"} gutter={18} style={{border: "1px dashed black"}}>
                                            <Col span={16}>
                                                <Form.Item
                                                    // label={t("transactions.fields.credit_account")}
                                                    name={[name, 'id']}
                                                    rules={[{required: true}]}
                                                    validateStatus={accountsBalanceError as any}
                                                            >
                                                    <Select
                                                        style={{ width: 300 }}
                                                        onChange={value => setSelectedDebitAccount(value)}
                                                        filterOption={true}
                                                        options={[...accountsOptions?.filter(item => item.value !== selectedCreditAccount)]}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    // label={t("transactions.fields.amount")}
                                                    name={[name, "amount"]}
                                                    rules={[{ required: true }]}
                                                    validateStatus={accountsBalanceError as any}
                                                >
                                                    <InputNumber precision={2} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Col>
                                        </Row>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            {t("transactions.form.add_credit")}
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Col>
                </Row>
                {/* <Form.Item
                    label={t("transactions.fields.amount")}
                    name="amount"
                    rules={[{ required: true }]}
                >
                    <InputNumber precision={2} />
                </Form.Item> */}
                {/* <Form.List
                    name="debit_accounts"
                    rules={[
                        {
                          validator: async (_, debit_accounts) => {
                            console.log(_, debit_accounts);
                            if (!debit_accounts || debit_accounts.length < 1) {
                              return Promise.reject(new Error('At least 1 Debit account'));
                            }
                          },
                        },
                    ]}
                >
                    {(fields, {add, remove}, {errors}) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        label={t("transactions.fields.debit_account")}
                                        name={[name, 'id']}
                                        rules={[{required: true}]}
                                        validateStatus={accountsBalanceError as any}
                                                >
                                        <Select
                                            style={{ width: 300 }}
                                            onChange={value => setSelectedDebitAccount(value)}
                                            filterOption={true}
                                            options={[...accountsOptions?.filter(item => item.value !== selectedCreditAccount)]}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={t("transactions.fields.amount")}
                                        name={[name, "amount"]}
                                        rules={[{ required: true }]}
                                        validateStatus={accountsBalanceError as any}
                                    >
                                        <InputNumber precision={2} />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    {t("transactions.form.add_debit")}
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.List
                    name="credit_accounts"
                    rules={[
                        {
                          validator: async (_, credit_accounts) => {
                            if (!credit_accounts || credit_accounts.length < 1) {
                              return Promise.reject(new Error('At least 1 Credit account'));
                            }
                          },
                        },
                    ]}
                >
                    {(fields, {add, remove}, {errors}) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        label={t("transactions.fields.credit_account")}
                                        name={[name, 'id']}
                                        rules={[{required: true}]}
                                        validateStatus={accountsBalanceError as any}
                                                >
                                        <Select
                                            style={{ width: 300 }}
                                            onChange={value => setSelectedDebitAccount(value)}
                                            filterOption={true}
                                            options={[...accountsOptions?.filter(item => item.value !== selectedCreditAccount)]}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={t("transactions.fields.amount")}
                                        name={[name, "amount"]}
                                        rules={[{ required: true }]}
                                        validateStatus={accountsBalanceError as any}
                                    >
                                        <InputNumber precision={2} />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    {t("transactions.form.add_credit")}
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List> */}
                {/* <Form.Item
                    label={t("transactions.fields.debit_account")}
                    name="debit_accounts"
                    rules={[{required: true}]}
                >
                    <Select
                        style={{ width: 300 }}
                        onChange={value => setSelectedDebitAccount(value)}
                        filterOption={true}
                        options={[...accountsOptions?.filter(item => item.value !== selectedCreditAccount)]}
                    />
                </Form.Item> */}
                {/* <Form.Item
                    label={t("transactions.fields.credit_account")}
                    name="credit_account_id"
                    rules={[{required: true}]}
                >
                    <Select
                        style={{ width: 300 }}
                        onChange={value => setSelectedCreditAccount(value)}
                        filterOption={true}
                        options={[...accountsOptions?.filter(item => item.value !== selectedDebitAccount)]}
                    />
                </Form.Item> */}
                <Form.Item
                    label={t("transactions.fields.notes_pr")}
                    name="notes_pr"
                >
                    <Select
                        style={{ width: 300 }}
                        filterOption={true}
                        options={accountsOptions}
                    />
                </Form.Item>
                <Form.Item
                    label={t("transactions.fields.tax")}
                    name="tax_id"
                    rules={[{required: true}]}
                >
                    <Select
                        style={{ width: 300 }}
                        {...taxesSelectProps}
                    />
                </Form.Item>
                <Form.Item
                    label={t("transactions.fields.issue_payment")}
                    name="issue_payment"
                >
                    <Switch />
                </Form.Item>
                
            </Form>
        </Modal>
    );
};
