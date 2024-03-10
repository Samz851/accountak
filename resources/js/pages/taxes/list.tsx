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

import { ITax, ITaxFilterVariables } from "../../interfaces";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { PaginationTotal, UserStatus } from "../../components";
import { PropsWithChildren, useId } from "react";
import { useLocation } from "react-router-dom";
import { ListTitleButton } from "@/components/listTitleButton/list-title-button";

export const TaxesList = ({ children }: PropsWithChildren) => {
    const go = useGo();
    const { pathname } = useLocation();
    const { showUrl, createUrl } = useNavigation();
    const t = useTranslate();
    const { token } = theme.useToken();

    const { tableProps, filters, sorters } = useTable<
        ITax,
        HttpError,
        ITaxFilterVariables
    >({
        filters: {
            initial: [
                {
                    field: "name",
                    operator: "contains",
                    value: "",
                },
            ],
        },
        sorters: {
            initial: [
                {
                    field: "id",
                    order: "desc",
                },
            ],
        },
        syncWithLocation: true,
    });

    const { isLoading, triggerExport } = useExport<ITax>({
        sorters,
        filters,
        pageSize: 50,
        maxItemCount: 50,
        mapData: (item) => {
            return {
                id: item.id,
                fullName: item.name,
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
                            to: `${createUrl("taxes")}`,
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
                    {t("taxes.form.add")}
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
                        <PaginationTotal total={total} entityName="taxes" />
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
                    key="rate"
                    dataIndex="rate"
                    title={t("taxes.fields.rate")}
                    defaultFilteredValue={getDefaultFilter(
                        "rate",
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
                    render={(value) => {
                        return (
                        <Typography.Text
                        style={{
                            whiteSpace: "nowrap",
                        }}
                    >
                        % {(parseFloat(value) * 100).toFixed(2)}
                        </Typography.Text>
                        )
                    }
                    }
                />
                {/* <Table.Column<IAccount>
                    key="parent_account"
                    dataIndex={["parent_account", "account_name"]}
                    title={t("accounts.fields.parent_account")}
                    // render={(_, value) => (
                    //     <Typography.Text
                    //     style={{
                    //         whiteSpace: "nowrap",
                    //     }}
                    // >
                    //     {value?.parent_account?.account_name}
                    // </Typography.Text>
                    // )}
                />
                <Table.Column<IAccount>
                    key="child_accounts"
                    dataIndex={["child_accounts"]}
                    title={t("accounts.fields.child_accounts")}
                    render={(_, value) =>
                        value.child_accounts.map(child => (
                            <Row key={child?.id}>

                                <Typography.Text
                                    style={{
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {child?.account_name}
                                </Typography.Text>
                            </Row>
                        ))
                    }
                /> */}
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
                <Table.Column<ITax>
                    fixed="right"
                    title={t("table.actions")}
                    render={(_, record) => (
                        <Button
                            icon={<EyeOutlined />}
                            onClick={() => {
                                return go({
                                    to: `${showUrl("taxes", record.id)}`,
                                    query: {
                                        to: pathname,
                                    },
                                    options: {
                                        keepQuery: true,
                                    },
                                    type: "push",
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
