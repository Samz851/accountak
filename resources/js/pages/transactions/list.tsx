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

import { IAccount, ITransaction, ITransactionFilterVariables } from "../../interfaces";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { PaginationTotal, UserStatus } from "../../components";
import { PropsWithChildren, useId } from "react";
import { useLocation } from "react-router-dom";
import { ListTitleButton } from "@/components/listTitleButton/list-title-button";

export const TransactionsList = ({ children }: PropsWithChildren) => {
    const go = useGo();
    const { pathname } = useLocation();
    const { showUrl, createUrl } = useNavigation();
    const t = useTranslate();
    const { token } = theme.useToken();

    const { tableProps, filters, sorters } = useTable<
        ITransaction,
        HttpError,
        ITransactionFilterVariables
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

    const { isLoading, triggerExport } = useExport<ITransaction>({
        sorters,
        filters,
        pageSize: 50,
        maxItemCount: 50,
        mapData: (item) => {
            return {
                id: item.id,
                fullName: item.id,
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
                            to: `${createUrl("transactions")}`,
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
                    {t("transactions.form.add")}
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
                        <PaginationTotal total={total} entityName="transactions" />
                    ),
                }}
            >
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title="ID #"
                    render={(value) => (
                        <Typography.Text
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            #{value}
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
                    key="date"
                    dataIndex="date"
                    title={t("transactions.fields.date")}
                    defaultFilteredValue={getDefaultFilter(
                        "date",
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
                    key="description"
                    dataIndex={["description"]}
                    title={t("transactions.fields.description")}
                    defaultFilteredValue={getDefaultFilter(
                        "description",
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
                    key="amount"
                    dataIndex={["amount"]}
                    title={t("transactions.fields.amount")}
                />
                <Table.Column<IAccount[]>
                    key="debit_account"
                    dataIndex={["debit_accounts"]}
                    title={t("transactions.fields.debit_account")}
                    render={(value) =>
                            value.map((account) => (
                                <Row key={account?.id}>
                                    <Typography.Text
                                        style={{
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        ({account.id}) {account?.account_name}
                                    </Typography.Text>
                                </Row>
                            ))
                        // value.child_accounts.map(child => (
                            
                        // ))
                    }
                />
                <Table.Column<IAccount>
                    key="credit_account"
                    dataIndex={["credit_accounts"]}
                    title={t("transactions.fields.credit_account")}
                    render={(value) =>
                        value.map((account) => (
                            <Row key={account?.id}>
                                <Typography.Text
                                    style={{
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    ({account.id}) {account?.account_name}
                                </Typography.Text>
                            </Row>
                        ))
                    }
                />
                <Table.Column
                    key="notes_pr"
                    dataIndex={["noteable", "id"]}
                    title={t("transactions.fields.notes_pr")}
                />
                <Table.Column<IAccount>
                    fixed="right"
                    title={t("table.actions")}
                    render={(_, record) => (
                        <Button
                            icon={<EyeOutlined />}
                            onClick={() => {
                                return go({
                                    to: `${showUrl("accounts", record.id)}`,
                                    query: {
                                        to: pathname,
                                    },
                                    options: {
                                        keepQuery: true,
                                    },
                                    type: "replace",
                                });
                            }}
                        />
                    )}
                />
            </Table>
            {children}
        </List>
    );
};
