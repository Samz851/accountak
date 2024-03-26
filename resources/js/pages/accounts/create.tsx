import { useLocation, useSearchParams } from "react-router-dom";

import { useModalForm, useTable } from "@refinedev/antd";
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
    TreeSelectProps,
    Typography,
} from "antd";

import { IAccount, IAccountFilterVariables, IAccountsBranch } from "@/interfaces";

import { useAccountTypesSelect } from "@/hooks/useAccountTypesSelect";
import { useAccountsSelect } from "@/hooks/useAccountsSelect";
import { useCallback, useEffect, useState } from "react";
import { useTraceUpdate } from "@/hooks/dev";
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
    account_branch_id: number;
};

export const AccountCreatePage = (props) => {
    useTraceUpdate(props);
    console.log(`Create Account`, props);
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const go = useGo();
    const [typeValue, setTypeValue] = useState<string>();
    const [parentValue, setParentValue] = useState<string>();
    const t = useTranslate();

    // const onChangeType = (newValue: string) => {
    //     setTypeValue(newValue);
    // };
    // const onChangeParent = (newValue: string) => {
    //     setParentValue(newValue);
    // };

    const [ accountsOptions, setAccountsOptions ] = useState<IAccount[] | []>([]);
    const [ expandedAccount, setExpandedAccount ] = useState('');

    const { formProps, modalProps, close, onFinish } = useModalForm<IAccount, HttpError, FormValues
    >({
        action: "create",
        defaultVisible: true,
        resource: "accounts",
        redirect: false,
        warnWhenUnsavedChanges: !props.isOverModal,
    });

    const { tableProps: AccountselectProps, filters, setFilters, sorters } = useTable<
        IAccount,
        HttpError,
        IAccountFilterVariables
    >({
        filters: {
            mode: "server",
        },
        sorters: {
            mode: "off",
        },
        syncWithLocation: true,
        pagination: {
            mode: "off"
          },
    });

    const loadMoreAccounts = useCallback((record) => {
        console.log('keys', record)
            setFilters([{field: 'parent', operator: 'eq', value: record.value}], 'merge');

        
    }, [expandedAccount])

    const onExpandAccount = (keys) => {
        console.log('keys', keys)
        let parentID = keys.pop();
        setExpandedAccount(parentID);
        setFilters([{field: 'parent', operator: 'eq', value: parentID}], 'merge');
    }

    useEffect(() => {console.log(accountsOptions)}, [accountsOptions])
    useEffect(()=>{
        console.log('state', accountsOptions, AccountselectProps);
        if ( ! AccountselectProps.loading ) {
            console.log('account not loading', AccountselectProps)
            if ( accountsOptions.length === 0 ) {
                console.log('account not loading', AccountselectProps, accountsOptions)
                setAccountsOptions([...AccountselectProps.dataSource as any]);
            } else if ( expandedAccount !== '' ) {
                setAccountsOptions((prevAccounts) => {
                    console.log('account not loading', AccountselectProps, accountsOptions, expandedAccount, prevAccounts)
                    const updateAccounts = (accounts) => {
                        return [...(accounts as any)?.map(account => {
                            if ( expandedAccount.startsWith(account.code) ) {
                                if ( expandedAccount === account.code ) {
                                    return {
                                        ...account,
                                        children: [...AccountselectProps.dataSource as any]
                                    }
                                }
                                if ( expandedAccount.length > account.code.length ) {
                                    return {
                                        ...account,
                                        children: updateAccounts(account.children)
                                    }
                                }
                            } else {
                                return account;
                            }
                        })]
                    }
                    return [...updateAccounts(prevAccounts)];
    
                })
            }
        }

    }, [AccountselectProps.dataSource]);

    return (
        <Modal
            {...modalProps}
            mask={!props.isOverModal}
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
            title={t("accounts.form.add")}
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
                            account_branch_id: values.account_branch_id,
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
                    label={t("accounts.fields.name")}
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Please enter account name" />
                </Form.Item>
                <Form.Item
                    label={t("accounts.fields.parent")}
                    name="account_branch_id"
                    rules={[{ required: true }]}
                >
                    <TreeSelect
                        style={{ width: '100%' }}
                        // loadData={loadMoreAccounts as any}
                        fieldNames={{label: "code_label", "value": "id"}}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={accountsOptions}
                        placeholder="Please select"
                        // onChange={onChangeType}
                        allowClear={true}
                        onTreeExpand={onExpandAccount}
                        />

                </Form.Item>
            </Form>
        </Modal>
    );
};
