import { CardWithContent, Drawer } from "@/components";
import { RandomAvatar } from "@/components/avatar";
import { IAccount, IAccountsBranch } from "@/interfaces";
import { IResourceComponentsProps, useNavigation, useShow } from "@refinedev/core";
import { Flex, Grid, Typography, theme } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
    accountsBranch?: IAccountsBranch;
};

export const AccountsBranchView = ({accountsBranch}: Props) => {
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
                        #{accountsBranch?.id}
                    </Typography.Text>
                    <Typography.Title
                        level={3}
                        style={{
                            margin: 0,
                        }}
                    >
                        {accountsBranch?.name}
                    </Typography.Title>
                </Flex>
            </Flex>
            <CardWithContent title={t('accounts_branches.fields.description')}>
                <Typography.Text>
                    {accountsBranch?.description}
                </Typography.Text>
            </CardWithContent>
            {
                accountsBranch?.parent_accounts_branch &&
                <CardWithContent title={t('accounts_branches.fields.parent_branch')}>
                    <Typography.Link
                        strong
                        onClick={() => show('accounts_branches', accountsBranch.parent_branch?.id || 0, 'push')}
                        style={{
                            whiteSpace: "nowrap",
                            color: token.colorTextHeading,
                        }}
                    >
                        {accountsBranch.parent_branch?.name}
                    </Typography.Link>
                </CardWithContent>
            }
            {
                accountsBranch?.child_branches &&
                <CardWithContent title={t('accounts_branches.fields.child_branches')}>
                {
                    accountsBranch?.child_branches?.map(branch => (
                        <Flex vertical key={branch.id}>
                            <Typography.Link
                                strong
                                onClick={() => show('accounts_branches', branch.id, 'push')}
                                style={{
                                    whiteSpace: "nowrap",
                                    color: token.colorTextHeading,
                                }}
                            >
                                {branch.name}
                            </Typography.Link>
                        </Flex>
                    ))
                }
                </CardWithContent>
            }
            <CardWithContent title={t('accounts_branches.fields.accounts')}>
            {
                accountsBranch?.accounts?.map(account => (
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
