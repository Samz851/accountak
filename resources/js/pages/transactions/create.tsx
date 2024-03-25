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
    Divider,
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

type Accounts = {
    id: number;
    amount: number;
}
type FormValues = {
    date: string;
    name: string;
    description: string;
    amount: number;
    debit_accounts: Array<Accounts>;
    credit_accounts: Array<Accounts>;
    notes_pr?: number;
    issue_payment: boolean;
    tax_id: number;
};
type totalAccounts = {
    [key: number]: number;
}

export const TransactionCreatePage = ({ isOverModal }: Props) => {
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const go = useGo();
    const t = useTranslate();
    const [ totalDebit, setTotalDebit ] = useState<totalAccounts>({});
    const [ totalCredit, setTotalCredit ] = useState<totalAccounts>({});
    const [ accountsBalanceError, setAccountsBalanceError ] = useState(false)
    const [ selectedCreditAccount, setSelectedCreditAccount ] = useState<number>(0);
    const [ selectedDebitAccount, setSelectedDebitAccount ] = useState<number>(0);

    const { styles } = useStyles();
    // const onChangeType = (newValue: string) => {
    //     // console.log(newValue);
    //     setTypeValue(newValue);
    // };
    // const onChangeParent = (newValue: string) => {
    //     // console.log(newValue);
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

    const removeAccount = (key, type, name, cb) => {
        if ( type === 'credit' ) {
            const newTotal = {...totalCredit};
            delete newTotal[key];
            setTotalCredit({...newTotal}) 
        } else {
            const newTotal = {...totalDebit};
            delete newTotal[key];
            setTotalDebit({...newTotal}) 
        }
        cb(name);

    }

    const getErrors = () => {
        let errs = form.getFieldsError();
        let vals = form.getFieldsValue();
        console.log('errors', vals);
    }

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
                    const totalDebitAmount = Object.values(totalDebit).reduce((acc, cur) => acc + cur, 0);
                    const totalCreditAmount = Object.values(totalCredit).reduce((acc, cur) => acc + cur, 0)
                    console.log(totalCreditAmount, totalDebitAmount);
                    if (totalDebitAmount !== totalCreditAmount) {
                        setAccountsBalanceError(true);
                        form.setFields([
                            {
                                name: ['credit_accounts'],
                                errors: ["Accounts not balanced"]
                            },
                            {
                                name: ['debit_accounts'],
                                errors: ["Accounts not balanced"]
                            }
                        ])
                    } else {
                        try {
                            const data = await onFinish({
                                date: values.date.toString(),
                                name: values.name,
                                description: values.description,
                                amount: totalDebitAmount,
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
                    }
                }}
            >
                <Row justify={"space-between"} align={"middle"} gutter={18}>
                    <Col span={16}>
                        <Form.Item
                            // labelCol={{span: 8}}
                            label={t("transactions.fields.name")}
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            // labelCol={{span: 8}}
                            label={t("transactions.fields.description")}
                            name="description"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={t("transactions.fields.date")}
                            name="date"
                            rules={[{required: true}]}
                            initialValue={dayjs()}
                        >
                            <DatePicker minDate={dayjs()}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row justify={"space-around"} gutter={8} style={{border: "1px solid black"}}>
                    <Col span={12} style={{textAlign: "center", borderRight: "1px solid grey"}}>
                        <Row justify={"center"}>
                            <Typography.Title level={5}>
                                {t("transactions.form.debit")}
                            </Typography.Title>
                        </Row>
                        <Row>
                            <Col span={2} />
                            <Col span={16} style={{textAlign: "center", borderRight: "1px solid grey"}}>
                                <Typography.Text>
                                    {t("accounts.accounts")}
                                </Typography.Text>
                            </Col>
                            <Col span={6}>
                                <Typography.Text>
                                    {t("transactions.fields.amount")}
                                </Typography.Text>
                            </Col>
                        </Row>
                        <Form.List
                            name="debit_accounts"
                            rules={[
                                {
                                validator: async (_, debit_accounts) => {
                                    // console.log(_, debit_accounts);
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
                                        <Row key={key} align={"stretch"}>
                                            <Col span={2}>
                                                <MinusCircleOutlined onClick={() => removeAccount(key, 'debit', name, remove)} />
                                            </Col>
                                            <Col span={16} style={{textAlign: "center", borderRight: "1px solid grey"}}>
                                                <Form.Item
                                                    // label={t("transactions.fields.debit_account")}
                                                    name={[name, 'id']}
                                                    rules={[{required: true}]}
                                                    validateStatus={accountsBalanceError as any}
                                                            >
                                                    <Select
                                                        size="small"
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
                                                    <InputNumber
                                                        size="small"
                                                        precision={2}
                                                        onBlur={(e) => setTotalDebit({...totalDebit, [key]: parseInt(e.target.value)})}
                                                    />
                                                </Form.Item>
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
                    <Col span={12} style={{textAlign: "center", borderRight: "1px solid grey"}}>
                        <Row justify={"center"}>
                            <Typography.Title level={5}>
                                {t("transactions.form.credit")}
                            </Typography.Title>
                        </Row>
                        <Row>
                            <Col span={2} />
                            <Col span={16} style={{textAlign: "center", borderRight: "1px solid grey"}}>
                                <Typography.Text>
                                    {t("accounts.accounts")}
                                </Typography.Text>
                            </Col>
                            <Col span={6}>
                                <Typography.Text>
                                    {t("transactions.fields.amount")}
                                </Typography.Text>
                            </Col>
                        </Row>
                        <Form.List
                            name="credit_accounts"
                            rules={[
                                {
                                validator: async (_, credit_accounts) => {
                                    // console.log(_, credit_accounts);
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
                                        <Row key={key} align={"stretch"}>
                                            <Col span={2}>
                                                <MinusCircleOutlined onClick={() => removeAccount(key, 'credit', name, remove)} />
                                            </Col>
                                            <Col span={16} style={{textAlign: "center", borderRight: "1px solid grey"}}>
                                                <Form.Item
                                                    // label={t("transactions.fields.debit_account")}
                                                    name={[name, 'id']}
                                                    rules={[{required: true}]}
                                                    validateStatus={accountsBalanceError as any}
                                                            >
                                                    <Select
                                                        size="small"
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
                                                    <InputNumber 
                                                        size="small" 
                                                        precision={2}
                                                        onBlur={(e) => setTotalCredit( {...totalCredit, [key]: parseInt(e.target.value)})}
                                                    />
                                                </Form.Item>
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
                    <Col span={24} style={{textAlign: "center", borderRight: "1px solid grey"}}>
                        <Row justify={"space-around"} gutter={8} style={{minHeight: '50px'}}>
                            <Col span={12} style={{textAlign: "center", borderRight: "1px solid grey"}}>
                                <Row justify={"end"}>
                                    <Col span={6} style={{textAlign: "center", borderLeft: "1px solid grey"}}>
                                        <Typography.Title level={5} className={accountsBalanceError ? styles.errorBorder : ''}>
                                            {Object.values(totalDebit).reduce((acc, cur) => acc + cur, 0)}
                                        </Typography.Title>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12} style={{textAlign: "center"}}>
                                <Row justify={"end"}>
                                    <Col span={6} style={{textAlign: "center", borderLeft: "1px solid grey"}}>
                                        <Typography.Title level={5} className={accountsBalanceError ? styles.errorBorder : ''}>
                                            {Object.values(totalCredit).reduce((acc, cur) => acc + cur, 0)}
                                        </Typography.Title>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Divider />
                <Row justify={"space-between"} align={"middle"} gutter={18}>
                    <Col span={16}>
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
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={t("transactions.fields.issue_payment")}
                            name="issue_payment"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Button onClick={getErrors}>Get errors</Button>
        </Modal>
    );
};
