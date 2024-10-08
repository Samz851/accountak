import { useLocation, useOutletContext, useSearchParams } from "react-router-dom";

import { Create, SaveButton, useForm, useModalForm, useTable } from "@refinedev/antd";
import {
    HttpError, useBack, useGetToPath,
    useGo, useNavigation, useParsed, useTranslate
} from "@refinedev/core";
// import { GetFields, GetVariables } from "@refinedev/nestjs-query";

import {
    LeftOutlined, PlusOutlined
} from "@ant-design/icons";
import {
    Button,
    Divider,
    Form,
    Input,
    Modal, Space, TreeSelect
} from "antd";

import { CreateContextType, CreateFormPropsType, IAccount, IAccountFilterVariables } from "@/interfaces";

import { useEffect, useState } from "react";

type FormValues = {
    name: string;
    parent_id: number;
    description: string;
};

export const AccountCreateForm = () => {
    // console.log(`Create Account`, props);
    const { key } = useLocation();
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const go = useGo();
    const back = useBack()
    const t = useTranslate();
    const { create } = useNavigation();
    const [ createForms, goToCreateForm, openForms, setOpenForms ] = useOutletContext<CreateContextType>();
    const [ accountsOptions, setAccountsOptions ] = useState<IAccount[] | []>([]);
    const [ expandedAccount, setExpandedAccount ] = useState('');
    const { resource } = useParsed();
    const { form, formProps, onFinish, formLoading, saveButtonProps } = useForm<IAccount, HttpError, FormValues
    >({
        action: "create",
        resource: "accounts",
        redirect: false,
    });
    // useEffect(() => {
    //     if ( ! formLoading ) {
    //         setOpenForms([...openForms, resource?.name])
    //     }
    // }, [formLoading])
    const { tableProps: AccountselectProps, filters, setFilters, sorters } = useTable<
        IAccount,
        HttpError,
        IAccountFilterVariables
    >({
        filters: {
            initial: [
                {
                    field: "branch",
                    operator: "eq",
                    value: true
                }
            ],
        },
        sorters: {
            mode: "off",
        },
        syncWithLocation: true,
        pagination: {
            mode: "off"
          },
    });

    const onExpandAccount = (keys) => {
        console.log(keys);
        let parentID = keys.pop();
        setExpandedAccount(parentID);
        setFilters([{field: 'parent', operator: 'eq', value: parentID}], 'merge');
    }

    useEffect(()=>{
        if ( ! AccountselectProps.loading ) {
            if ( accountsOptions.length === 0 ) {
                setAccountsOptions([...AccountselectProps.dataSource as any]);
            } else if ( expandedAccount !== '' ) {
                setAccountsOptions((prevAccounts) => {
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

    useEffect(() => {
        const prevForm = createForms.find( (form) => form.key === key );
        if ( prevForm ) {
            form.setFieldsValue( prevForm.values || {});
        } else {
            // setOpenForms([...openForms, `accounts - ${key}`]);
        }
    }, []);

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form
                {...formProps}
                form={form}
                layout="vertical"
                onFinish={async (values) => {
                    try {
                        const data = await onFinish({
                            name: values.name,
                            parent_id: values.parent_id,
                            description: values.description
                        });
                        back();
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
                    label={t("branches.fields.description")}
                    name="description"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("accounts.fields.parent")}
                    name="parent_id"
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
                        dropdownRender={(menu) => (
                            <>
                            {menu}
                            <Divider style={{ margin: '8px 0' }} />
                            <Space style={{ padding: '0 8px 4px' }}>
                                <Button type="text" icon={<PlusOutlined />} onClick={() => goToCreateForm(form.getFieldsValue(true), 'branches')}>
                                Add item
                                </Button>
                            </Space>
                            </>
                        )}
                        />

                </Form.Item>
                <SaveButton/>
            </Form>
        </Create>
    );
};
