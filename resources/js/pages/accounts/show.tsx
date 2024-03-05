import {
    useShow,
    IResourceComponentsProps,
    useNavigation,
    useBack,
    useTranslate,
} from "@refinedev/core";
import { Flex, Grid, Table } from "antd";
import { IAccount } from "../../interfaces";
import {
    CardWithContent,
    CustomerInfoList,
    CustomerInfoSummary,
    CustomerOrderHistory,
    Drawer,
} from "../../components";
import { List } from "@refinedev/antd";
import { ButtonSuccess } from "@/button";
import { RollbackOutlined } from "@ant-design/icons";
import { AccountInfoView } from "./components/accountInfoView";
import { AccountBalanceTable } from "./components/accountBalanceTable";

export const AccountShow: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const { Column, ColumnGroup } = Table;
    const breakpoint = Grid.useBreakpoint();
    const { queryResult } = useShow<IAccount>();
    const back = useBack();
    const t = useTranslate();

    const { data } = queryResult;
    const account = data?.data;

    // return (
    //     <Drawer
    //         open
    //         onClose={() => back()}
    //         width={breakpoint.sm ? "736px" : "100%"}
    //     >
    //         <Flex
    //             vertical
    //             gap={32}
    //             style={{
    //                 padding: "32px",
    //             }}
    //         >
    //             <CardWithContent title={account?.account_name} />
    //         </Flex>
    //     </Drawer>
    // );
    return (
        <List
            breadcrumb={false}
            headerButtons={(props) => [
                // <ExportButton key={useId()} onClick={triggerExport} loading={isLoading} />,
                <ButtonSuccess
                    key="back"
                    icon={<RollbackOutlined/>}
                    onClick={() => back()}
                >
                    {t("buttons.return")}
                </ButtonSuccess>,
            ]}
        >
            <AccountInfoView account={account} />
            <AccountBalanceTable transactions={{debit: account?.debit_transactions, credit: account?.credit_transactions}} />
            {/* <Table>
                <ColumnGroup
                    title={t("accounts.debit")}
                >
                    <Column title={t("accounts.fields.date")} />
                    <Column title={t("transactions.fields.credit_account")} />
                    <Column title={t("transactions.fields.amount")} />
                </ColumnGroup>
                <ColumnGroup
                    title={t("accounts.credit")}
                >
                    <Column title={t("accounts.fields.date")} />
                    <Column title={t("transactions.fields.debit_account")} />
                    <Column title={t("transactions.fields.amount")} />
                </ColumnGroup>
            </Table> */}
            {/* <Table
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
                    key="account_type"
                    dataIndex={["account_type", "name"]}
                    title={t("accounts.fields.account_type")}
                    defaultFilteredValue={getDefaultFilter(
                        "account_type",
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
                <Table.Column<IAccount>
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
                {/* <Table.Column<IAccount>
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
            </Table> */}
        </List>
    );
};
