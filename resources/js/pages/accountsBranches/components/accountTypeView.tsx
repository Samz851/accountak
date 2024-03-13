import { CardWithContent, Drawer } from "@/components";
import { RandomAvatar } from "@/components/avatar";
import { IAccount, IAccountsBranch } from "@/interfaces";
import { IResourceComponentsProps, useNavigation, useShow } from "@refinedev/core";
import { Flex, Grid, Typography, theme } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
    accountType?: IAccountsBranch;
};

export const AccountsBranchView = ({accountType}: Props) => {
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
                        #{accountType?.id}
                    </Typography.Text>
                    <Typography.Title
                        level={3}
                        style={{
                            margin: 0,
                        }}
                    >
                        {accountType?.name}
                    </Typography.Title>
                </Flex>
            </Flex>
            <CardWithContent title={t('accounts_branches.fields.description')}>
                <Typography.Text>
                    {accountType?.description}
                </Typography.Text>
            </CardWithContent>
            {
                accountType?.parent_account_type &&
                <CardWithContent title={t('accounts_branches.fields.parent_type')}>
                    <Typography.Link
                        strong
                        onClick={() => show('accounts_branches', accountType.parent_type?.id || 0, 'push')}
                        style={{
                            whiteSpace: "nowrap",
                            color: token.colorTextHeading,
                        }}
                    >
                        {accountType.parent_type?.name}
                    </Typography.Link>
                </CardWithContent>
            }
            {
                accountType?.child_types &&
                <CardWithContent title={t('accounts_branches.fields.child_types')}>
                {
                    accountType?.child_types?.map(type => (
                        <Flex vertical key={type.id}>
                            <Typography.Link
                                strong
                                onClick={() => show('accounts_branches', type.id, 'push')}
                                style={{
                                    whiteSpace: "nowrap",
                                    color: token.colorTextHeading,
                                }}
                            >
                                {type.name}
                            </Typography.Link>
                        </Flex>
                    ))
                }
                </CardWithContent>
            }
            <CardWithContent title={t('accounts_branches.fields.accounts')}>
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
            </CardWithContent>
        </Flex>
    )
}
