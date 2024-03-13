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
            <CardWithContent title={t('accounts.fields.account_branch')}>
                <Typography.Text>
                    {account?.account_branch.name}
                </Typography.Text>
            </CardWithContent>
        </Flex>
    )
}
