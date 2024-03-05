import { IAccount, ITransaction } from "@/interfaces"
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Col, Flex, Row, Table, Typography, theme } from "antd";
import { useTranslation } from "react-i18next";

type Props = {
    transactions?: {
        debit?: ITransaction[];
        credit?: ITransaction[];
    };
}
export const AccountBalanceTable = ({transactions}: Props) => {
    const { t } = useTranslation();
    const { token } = theme.useToken();
    const { Column, ColumnGroup } = Table;
    const totalDebit = transactions?.debit?.reduce((prev, current) => {
        console.log(typeof prev, typeof current.amount);
        return prev + parseFloat(current.amount as string)
    }, 0);
    const totalCredit = transactions?.credit?.reduce((prev, current) => prev + parseFloat(current.amount as string), 0);

    return (
        <Row>
            <Col span={12}>
                <Table
                    pagination={false}
                    bordered
                    dataSource={transactions?.debit}
                    title={() => t("accounts.debit") as any}
                    footer={() => (
                        <Row>
                            <Col span={16}>
                                {"Total"}
                            </Col>
                            <Col>
                                { totalDebit }
                            </Col>
                        </Row>
                    )}
                >
                    <Column
                        title={t("accounts.fields.date") as any}
                        dataIndex="date"
                    />
                    <Column
                        title={t("transactions.fields.credit_account") as any}
                        dataIndex="credit_account_id"
                    />
                    <Column
                        title={t("transactions.fields.amount") as any}
                        dataIndex="amount"
                    />
                </Table>
            </Col>
            <Col span={12}>
                <Table
                    pagination={false}
                    bordered
                    dataSource={transactions?.credit}
                    title={() => t("accounts.credit") as any}
                    footer={() => (
                        <Row>
                            <Col span={16}>
                                {"Total"}
                            </Col>
                            <Col>
                                { totalCredit }
                            </Col>
                        </Row>
                    )}
                >
                        <Column
                            title={t("accounts.fields.date") as any}
                            dataIndex="date"
                        />
                        <Column
                            title={t("transactions.fields.debit_account") as any}
                            dataIndex="debit_account_id"
                        />
                        <Column
                            title={t("transactions.fields.amount") as any}
                            dataIndex="amount"
                        />
                </Table>
            </Col>
        {/* <Table dataSource={transactions}>
            <ColumnGroup<ITransaction[]>
                title={t("accounts.debit") as any}
            >
                <Column
                    title={t("accounts.fields.date") as any}
                    dataIndex={["debit"]}
                    render={(value, record) => (
                        <div>
                        <Row key={1}>
                        <Typography.Text>
                            {JSON.stringify(value)}
                        </Typography.Text>
                        </Row>
                        <Row key={2}>
                        <Typography.Text>
                            {JSON.stringify(record)}
                        </Typography.Text>
                        </Row>
                        </div>
                    )}
                />
                <Column
                    title={t("transactions.fields.credit_account") as any}
                    dataIndex={["debit", "credit_account_id"]}
                />
                <Column
                    title={t("transactions.fields.amount") as any}
                    dataIndex={["debit", "amount"]}
                />
            </ColumnGroup>
            <ColumnGroup<ITransaction[]>
                title={t("accounts.credit") as any}
            >
                <Column<ITransaction[]>
                    title={t("accounts.fields.date") as any}
                    dataIndex={["credit"]}
                    render={(value, record) => {
                        console.log(value, record);
                        return (
                        <div>
                        <Row key={1}>
                        <Typography.Text>
                            {JSON.stringify(value)}
                        </Typography.Text>
                        </Row>
                        <Row key={2}>
                        <Typography.Text>
                            {JSON.stringify(record)}
                        </Typography.Text>
                        </Row>
                        </div>
                    )}}
                />
                <Column
                    title={t("transactions.fields.debit_account") as any}
                    dataIndex={["credit", "debit_account_id"]}
                />
                <Column
                    title={t("transactions.fields.amount") as any}
                    dataIndex={["credit", "amount"]}
                />
            </ColumnGroup>
        </Table> */}
        </Row>

    )

}
