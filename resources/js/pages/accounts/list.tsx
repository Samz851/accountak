import {
    useTranslate,
    HttpError,
    getDefaultFilter, useGo,
    useNavigation
} from "@refinedev/core";
import {
    List,
    useTable, FilterDropdown, CreateButton
} from "@refinedev/antd";
import {
    Table, Typography,
    theme, Input, Button,
    Select
} from "antd";

import { IAccount, IAccountFilterVariables } from "@/interfaces";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStyles } from "./styled";
import { Key } from "antd/es/table/interface";
import type { SelectProps } from 'antd';

export const AccountsList = ({ children }: PropsWithChildren) => {
    const go = useGo();
    const { pathname } = useLocation();
    const { show, createUrl } = useNavigation();
    const t = useTranslate();
    const { token } = theme.useToken();
    const { styles} = useStyles();
    const [ fields, setFields ] = useState(["code", "name", "parent", "balance"]);

    const { tableProps, filters, setFilters, sorters } = useTable<
        IAccount,
        HttpError,
        IAccountFilterVariables
    >({
        filters: {
            initial: [
                {
                    field: "type",
                    operator: "eq",
                    value: "all",
                }
            ]
        },
        sorters: {
            mode: "off",
        },
        syncWithLocation: false,
        pagination: {
            mode: "off"
          },
    });



    const [ accounts, setAccounts ] = useState<IAccount[] | undefined>([...tableProps.dataSource as any ?? []]);
    const [ expandedAccount, setExpandedAccount ] = useState('');
    const [ expandedRows, setExpandedRows ] = useState<Key[]>();
    const [ columnsOptions, setColumnsOptions ] = useState<SelectProps['options']>([]);

    const initialColumnsOptions  = [
        {
            label: "code",
            key: "code",
            value: "code",
            dataIndex: "code",
            title:"ID #",
            rowScope:"row",
            render:(value) => (
                        <Typography.Text
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            {value}
                        </Typography.Text>
                    ),
            filterIcon:(filtered) => (
                        <SearchOutlined
                            style={{
                                color: filtered
                                    ? token.colorPrimary
                                    : undefined,
                            }}
                        />
                    ),
            defaultFilteredValue: getDefaultFilter(
                        "code",
                        filters,
                        "contains",
                    ),
            filterDropdown: (props) => (
                        <FilterDropdown {...props}>
                            <Input
                                addonBefore="#"
                                style={{ width: "100%" }}
                                placeholder={t("orders.filter.id.placeholder")}
                            />
                        </FilterDropdown>
                    ),
        },
        {
            label: "name",
            value: "name",
            key:"name",
                    dataIndex:"name",
                    title:t("users.fields.name"),
                    defaultFilteredValue:getDefaultFilter(
                        "name",
                        filters,
                        "contains",
                    ),
                    filterDropdown:(props) => (
                        <FilterDropdown {...props}>
                            <Input
                                style={{ width: "100%" }}
                                placeholder={t("users.filter.name.placeholder")}
                            />
                        </FilterDropdown>
                    )
        },
        {
            label: "parent",
            value: "parent",
            key:"parent",
                    dataIndex:["parent", "name"],
                    title:t("accounts.fields.parent"),
                    defaultFilteredValue:getDefaultFilter(
                        "parent",
                        filters,
                        "contains",
                    ),
                    filterDropdown:(props) => (
                        <FilterDropdown {...props}>
                            <Input
                                style={{ width: "100%" }}
                                placeholder={t("users.filter.gsm.placeholder")}
                            />
                        </FilterDropdown>
                    )
        },
        {
            label: "balance",
            value: "balance",
            key:"balance",
                    dataIndex:["balance"],
                    title:t("accounts.fields.balance"),
                    render:(_, record) => _.toLocaleString('en-US', {style: 'currency', currency: 'EGP' })
        },
    ]
    const allColumnsOptions = [
        {
            label: "id",
            value: "id",
            dataIndex: "id"
        },
        {
            label: "code",
            key: "code",
            value: "code",
            dataIndex: "code",
            title:"ID #",
            rowScope:"row",
            render:(value) => (
                        <Typography.Text
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            {value}
                        </Typography.Text>
                    ),
            filterIcon:(filtered) => (
                        <SearchOutlined
                            style={{
                                color: filtered
                                    ? token.colorPrimary
                                    : undefined,
                            }}
                        />
                    ),
            defaultFilteredValue: getDefaultFilter(
                        "code",
                        filters,
                        "contains",
                    ),
            filterDropdown: (props) => (
                        <FilterDropdown {...props}>
                            <Input
                                addonBefore="#"
                                style={{ width: "100%" }}
                                placeholder={t("orders.filter.id.placeholder")}
                            />
                        </FilterDropdown>
                    ),
        },
        {
            label: "name",
            value: "name",
            key:"name",
                    dataIndex:"name",
                    title:t("users.fields.name"),
                    defaultFilteredValue:getDefaultFilter(
                        "name",
                        filters,
                        "contains",
                    ),
                    filterDropdown:(props) => (
                        <FilterDropdown {...props}>
                            <Input
                                style={{ width: "100%" }}
                                placeholder={t("users.filter.name.placeholder")}
                            />
                        </FilterDropdown>
                    )
        },
        {
            label: "parent",
            value: "parent",
            key:"parent",
                    dataIndex:["parent", "name"],
                    title:t("accounts.fields.parent"),
                    defaultFilteredValue:getDefaultFilter(
                        "parent",
                        filters,
                        "contains",
                    ),
                    filterDropdown:(props) => (
                        <FilterDropdown {...props}>
                            <Input
                                style={{ width: "100%" }}
                                placeholder={t("users.filter.gsm.placeholder")}
                            />
                        </FilterDropdown>
                    )
        },
        {
            label: "balance",
            value: "balance",
            key:"balance",
                    dataIndex:["balance"],
                    title:t("accounts.fields.balance"),
                    render:(_, record) => _.toLocaleString('en-US', {style: 'currency', currency: 'EGP' })
        },
        {
            label: "description",
            value: "description",
            title:t("accounts.fields.description"),
            dataIndex: "description"
        },
        {
            label: "taxonomy",
            value: "taxonomy",
            dataIndex: "taxonomy"
        },
        {
            label: "created_at",
            value: "created_at",
            dataIndex: "created_at"
        },
        {
            label: "updated_at",
            value: "updated_at",
            dataIndex: "updated_at"
        },
        {
            label: "code_label",
            value: "code_label",
            dataIndex: "code_label"
        },
        {
            label: "tree_path",
            value: "tree_path",
            dataIndex: "tree_path"
        },
        {
            label: "has_children",
            value: "has_children",
            dataIndex: "has_children"
        },
        {
            label: "children",
            value: "children",
            dataIndex: "children"
        }
    ]
    useEffect(()=>{
        console.log(tableProps);
        if ( ! tableProps.loading ) {
            if ( expandedAccount !== '' ) {
                setAccounts((prevAccounts) => {
                    const updateAccounts = (accounts) => {
                        return [...(accounts as any)?.map(account => {
                            if ( expandedAccount.startsWith(account.code) ) {
                                if ( expandedAccount === account.code ) {
                                    return {
                                        ...account,
                                        children: [...tableProps.dataSource as any]
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
            } else {
                const singleOption = Array.isArray(tableProps.dataSource) ? tableProps.dataSource[0] : {};
                setAccounts([...tableProps.dataSource as any]);
                if ( singleOption ) {

                    setColumnsOptions([...Object.keys(singleOption).map(o => ({label: o, value: o, dataIndex: o})) as any]);
                    console.log(columnsOptions);
                }
            }
        }

    }, [tableProps.dataSource]);


    const onExpandAccount = (expanded: boolean, record: IAccount) => {
        setExpandedAccount(record.code);
        if ( ! record.children?.length && record.has_children ){
            setFilters([
                {
                    field: 'type',
                    operator: 'eq',
                    value: 'all',
                },
                {
                    field: 'parent',
                    operator: 'eq',
                    value: record.id,
                }
            ], 'replace');
        }
    }

    const addExpandedKeysValue = (keys) => {
        let key = keys.pop();
        console.log(key);
        console.log(! expandedRows, expandedRows?.length, expandedRows)
        console.log(keys);
        if ( ! expandedRows ) {
            setExpandedRows([key]);
        } else if ( key.startsWith(expandedRows[0]) ) {
            setExpandedRows([...expandedRows, key]);
        } else {
            setExpandedRows([key]);
        }
    }

    const isExpandable = (record: IAccount) => {
        console.log('expandable', record);
        return record.has_children ?? false;
    }

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
    };

    const handleSetFields = () => {

    }
    return (
        <List
            breadcrumb={false}
            headerButtons={(props) => [
                // <ExportButton key={useId()} onClick={triggerExport} loading={isLoading} />,
                <CreateButton
                    {...props.createButtonProps}
                    key="create"
                    size="large"
                    onClick={() => {
                        return go({
                            to: `${createUrl("accounts")}`,
                            query: {
                                to: pathname,
                            },
                            options: {
                                keepQuery: true,
                            },
                            type: "replace",
                        });
                    }}
                >
                    {t("accounts.form.add")}
                </CreateButton>,
            ]}
        >
        <Select
            style={{width: "100%"}}
            mode="multiple"
            allowClear
            options={allColumnsOptions}
            value={fields}
            onChange={(value, option) => setFields([...value])}
            />
            <Button onClick={handleSetFields}>{"Submit"}</Button>
            <Table
                {...tableProps}
                dataSource={accounts}
                className={styles.expanded}
                columns={allColumnsOptions.filter(c => fields.includes(c.label)) as any}
                rowKey="code"
                scroll={{ x: true }}
                rowSelection={rowSelection}
                expandable={{
                    onExpand: onExpandAccount,
                    // onExpandedRowsChange: (keys) => addExpandedKeysValue(keys),
                    rowExpandable: isExpandable,
                    indentSize: 30,
                    expandedRowClassName: (record) => record.taxonomy,
                    // expandedRowKeys: expandedRows
                }}
            >
                {/* <Table.Column
                    key="code"
                    dataIndex="code"
                    title="ID #"
                    rowScope="row"
                    render={(value) => (
                        <Typography.Text
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            {value}
                        </Typography.Text>
                    )}
                    filterIcon={(filtered) => (
                        <SearchOutlined
                            style={{
                                color: filtered
                                    ? token.colorPrimary
                                    : undefined,
                            }}
                        />
                    )}
                    defaultFilteredValue={getDefaultFilter(
                        "code",
                        filters,
                        "contains",
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input
                                addonBefore="#"
                                style={{ width: "100%" }}
                                placeholder={t("orders.filter.id.placeholder")}
                            />
                        </FilterDropdown>
                    )}
                    // onCell={(record: IAccount, index) => { 
                    //     console.log(index, record);
                    //     if ( record.has_children && record.children?.length ) {
                    //         return { 
                    //             rowSpan: record.children.length + 1,
                    //             colSpan: record.code.split(/(.{2})/).filter(O=>O).length
                    //         }
                    //     }
                    //     return { }
                    // }}
                />
                <Table.Column
                    key="name"
                    dataIndex="name"
                    title={t("users.fields.name")}
                    defaultFilteredValue={getDefaultFilter(
                        "name",
                        filters,
                        "contains",
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input
                                style={{ width: "100%" }}
                                placeholder={t("users.filter.name.placeholder")}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    key="parent"
                    dataIndex={["parent", "name"]}
                    title={t("accounts.fields.parent")}
                    defaultFilteredValue={getDefaultFilter(
                        "parent",
                        filters,
                        "contains",
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input
                                style={{ width: "100%" }}
                                placeholder={t("users.filter.gsm.placeholder")}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    key="balance"
                    dataIndex={["balance"]}
                    title={t("accounts.fields.balance")}
                    render={(_, record) => _.toLocaleString('en-US', {style: 'currency', currency: 'EGP' })}
                />
                <Table.Column<IAccount>
                    fixed="right"
                    title={t("table.actions")}
                    render={(_, record) => (
                        <Button
                            icon={<EyeOutlined />}
                            onClick={() => show('accounts', record.id, "push")}
                        />
                    )}
                /> */}
            </Table>
            {children}
        </List>
    );
};
