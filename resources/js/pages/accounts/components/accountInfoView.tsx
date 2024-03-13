import { CardWithContent, Drawer } from "@/components";
import { RandomAvatar } from "@/components/avatar";
import { IAccount, IAccountsBranch } from "@/interfaces";
import { IResourceComponentsProps, useNavigation, useShow } from "@refinedev/core";
import { Flex, Grid, Typography, theme } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
    account?: IAccount;
};

export const AccountInfoView = ({account}: Props) => {
    const { t } = useTranslation();
    const { show } = useNavigation();
    const { token } = theme.useToken();

    // const { data } = queryResult;
    // const company = data?.data;

    return (
        <Flex
            vertical
            gap={32}
            style={{
                padding: '32px',
            }}
        >
            <Flex align="center" gap={32}>
                <RandomAvatar />
                <Flex vertical>
                    <Typography.Text type="secondary">
                        #{account?.id}
                    </Typography.Text>
                    <Typography.Title
                        level={3}
                        style={{
                            margin: 0,
                        }}
                    >
                        {account?.account_name}
                    </Typography.Title>
                </Flex>
            </Flex>
            <CardWithContent title={t('accounts.fields.account_type')}>
                <Typography.Text>
                    {account?.account_type.name}
                </Typography.Text>
            </CardWithContent>
            {
                account?.parent_account_id &&
                <CardWithContent title={t('accounts.fields.parent_account')}>
                    <Typography.Link
                        strong
                        onClick={() => show('accounts', account.parent_account?.id || 0, 'push')}
                        style={{
                            whiteSpace: "nowrap",
                            color: token.colorTextHeading,
                        }}
                    >
                        {account.parent_account?.account_name}
                    </Typography.Link>
                </CardWithContent>
            }
            {
                account?.child_accounts &&
                <CardWithContent title={t('accounts.fields.child_accounts')}>
                {
                    account?.child_accounts?.map(child => (
                        <Flex vertical key={child.id}>
                            <Typography.Link
                                strong
                                onClick={() => show('accounts', child.id, 'push')}
                                style={{
                                    whiteSpace: "nowrap",
                                    color: token.colorTextHeading,
                                }}
                            >
                                {child.account_name}
                            </Typography.Link>
                        </Flex>
                    ))
                }
                </CardWithContent>
            }
            {/* <CardWithContent title={t('accounts_branches.fields.accounts')}>
            {
                accountType?.accounts?.map(account => (
                    <Flex vertical key={account.id}>
                        <Typography.Link
                            strong
                            onClick={() => show('accounts', account.id, 'push')}
                            style={{
                                whiteSpace: "nowrap",
                                color: token.colorTextHeading,
                            }}
                        >
                            {account.account_name}
                        </Typography.Link>
                    </Flex>
                ))
            }
            </CardWithContent> */}
        </Flex>
    )
}
