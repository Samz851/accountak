import { NumberField, useTable } from "@refinedev/antd";
import { IUser, IOrder, IOrderFilterVariables } from "../../../interfaces";
import { HttpError, useNavigation, useTranslate } from "@refinedev/core";
import { Table, Typography } from "antd";
import { OrderStatus, OrderTableColumnProducts } from "../../order";

type Props = {
    customer?: IUser;
};

export const CustomerOrderHistory = ({ customer }: Props) => {
    const t = useTranslate();
    const { show } = useNavigation();

    const { tableProps } = useTable<IOrder, HttpError, IOrderFilterVariables>({
        resource: "orders",
        initialSorter: [
            {
                field: "createdAt",
                order: "desc",
            },
        ],
        permanentFilter: [
            {
                field: "user.id",
                operator: "eq",
                value: customer?.id,
            },
        ],
        initialPageSize: 4,
        queryOptions: {
            enabled: customer !== undefined,
        },
        syncWithLocation: false,
    });

    return (
        <Table
            {...tableProps}
            rowKey="id"
            onRow={(record) => {
                return {
                    onClick: () => {
                        show("orders", record.id);
                    },
                };
            }}
            pagination={{
                ...tableProps.pagination,
                hideOnSinglePage: true,
            }}
        >
            <Table.Column
                title={`${t("orders.order")} #`}
                dataIndex="id"
                key="id"
                render={(value) => (
                    <Typography.Text
                        style={{
                            whiteSpace: "nowrap",
                        }}
                    >
                        #{value}
                    </Typography.Text>
                )}
            />
            <Table.Column
                key="status.text"
                dataIndex="status"
                title={t("orders.fields.status")}
                render={(status) => {
                    return <OrderStatus status={status.text} />;
                }}
            />
            <Table.Column<IOrder>
                key="products"
                dataIndex="products"
                title={t("orders.fields.products")}
                render={(_, record) => {
                    return <OrderTableColumnProducts order={record} />;
                }}
            />
            <Table.Column<IOrder>
                dataIndex="amount"
                align="end"
                title={t("orders.fields.amount")}
                render={(amount) => {
                    return (
                        <NumberField
                            value={amount / 100}
                            style={{
                                whiteSpace: "nowrap",
                            }}
                            options={{
                                style: "currency",
                                currency: "USD",
                            }}
                        />
                    );
                }}
            />
            <Table.Column
                key="store.title"
                dataIndex={["store", "title"]}
                title={t("orders.fields.store")}
            />
        </Table>
    );
};
