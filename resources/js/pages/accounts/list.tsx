import {
    useTranslate,
    HttpError,
    getDefaultFilter,
    useExport,
    useGo,
    useNavigation,
} from "@refinedev/core";
import {
    List,
    useTable,
    DateField,
    FilterDropdown,
    getDefaultSortOrder,
    ExportButton,
    CreateButton,
} from "@refinedev/antd";
import {
    Table,
    Avatar,
    Typography,
    theme,
    InputNumber,
    Input,
    Select,
    Button,
    Row,
} from "antd";

import { IAccount, IAccountFilterVariables } from "../../interfaces";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { PaginationTotal, UserStatus } from "../../components";
import { PropsWithChildren, useId } from "react";
import { useLocation } from "react-router-dom";
import { ListTitleButton } from "@/components/listTitleButton/list-title-button";

export const AccountsList = ({ children }: PropsWithChildren) => {
    const go = useGo();
    const { pathname } = useLocation();
    const { show, createUrl } = useNavigation();
    const t = useTranslate();
    const { token } = theme.useToken();

    const { tableProps, filters, sorters } = useTable<
        IAccount,
        HttpError,
        IAccountFilterVariables
    >({
        filters: {
            mode: "off",
        },
        sorters: {
            mode: "off",
        },
        syncWithLocation: true,
        pagination: {
            mode: "server",
          },
    });

    const { isLoading, triggerExport } = useExport<IAccount>({
        sorters,
        filters,
        pageSize: 50,
        maxItemCount: 50,
        mapData: (item) => {
            return {
                id: item.id,
                fullName: item.account_name,
                account_branch: item.account_branch.name
            };
        },
    });

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
            <Table
                {...tableProps}
                rowKey="id"
                scroll={{ x: true }}
                pagination={{
                    ...tableProps.pagination,
                    showTotal: (total) => (
                        <PaginationTotal total={total} entityName="accounts" />
                    ),
                }}
            >
                <Table.Column
                    key="id"
                    dataIndex="code"
                    title="ID #"
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
                        "orderNumber",
                        filters,
                        "eq",
                    )}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <InputNumber
                                addonBefore="#"
                                style={{ width: "100%" }}
                                placeholder={t("orders.filter.id.placeholder")}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    key="account_name"
                    dataIndex="account_name"
                    title={t("users.fields.name")}
                    defaultFilteredValue={getDefaultFilter(
                        "account_name",
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
                    key="account_branch"
                    dataIndex={["account_branch", "name"]}
                    title={t("accounts.fields.account_branch")}
                    defaultFilteredValue={getDefaultFilter(
                        "account_branch",
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
                    // render={(value) => (
                    //     <Typography.Text
                    //     style={{
                    //         whiteSpace: "nowrap",
                    //     }}
                    // >
                    //     {value.name}
                    // </Typography.Text>
                    // )}
                />
                <Table.Column
                    key="balance"
                    dataIndex={["balance"]}
                    title={t("accounts.fields.balance")}
                />
                {/* <Table.Column
                    key="createdAt"
                    dataIndex="createdAt"
                    title={t("users.fields.createdAt")}
                    render={(value) => <DateField value={value} format="LLL" />}
                    sorter
                />
                <Table.Column
                    key="isActive"
                    dataIndex="isActive"
                    title={t("users.fields.isActive.label")}
                    render={(value) => {
                        return <UserStatus value={value} />;
                    }}
                    sorter
                    defaultSortOrder={getDefaultSortOrder("isActive", sorters)}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ width: "100%" }}
                                placeholder={t(
                                    "users.filter.isActive.placeholder",
                                )}
                            >
                                <Select.Option value="true">
                                    {t("users.fields.isActive.true")}
                                </Select.Option>
                                <Select.Option value="false">
                                    {t("users.fields.isActive.false")}
                                </Select.Option>
                            </Select>
                        </FilterDropdown>
                    )}
                /> */}
                <Table.Column<IAccount>
                    fixed="right"
                    title={t("table.actions")}
                    render={(_, record) => (
                        <Button
                            icon={<EyeOutlined />}
                            onClick={() => show('accounts', record.id, "push")}
                        />
                    )}
                />
            </Table>
            {children}
        </List>
    );
};
