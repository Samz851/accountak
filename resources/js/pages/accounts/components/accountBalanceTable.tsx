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
        return prev + parseFloat(current.dbtrans.amount as string)
    }, 0);
    const totalCredit = transactions?.credit?.reduce((prev, current) => {
        return prev + parseFloat(current.crtrans.amount as string)
    }, 0);

    return (
        <Row>
            <Col span={12}>
                <Table
                rowKey={(record) => record.id}
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
                                - { totalDebit }
                            </Col>
                        </Row>
                    )}
                >
                    <Column
                        title={t("accounts.fields.date") as any}
                        dataIndex="date"
                        key="date"
                    />
                    <Column
                        title={t("transactions.fields.credit_account") as any}
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        title={t("transactions.fields.amount") as any}
                        dataIndex={["dbtrans","amount"]}
                        key="dbtrans"
                    />
                </Table>
            </Col>
            <Col span={12}>
                <Table
                rowKey={(record) => record.id}
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
                            key="alpha"
                        />
                        <Column
                            title={t("transactions.fields.debit_account") as any}
                            dataIndex="debit_account_id"
                            key="romeo"
                        />
                        <Column
                            title={t("transactions.fields.amount") as any}
                            dataIndex="amount"
                            key="what"
                        />
                </Table>
            </Col>
        </Row>

    )

}
