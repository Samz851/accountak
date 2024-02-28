import {
    useTranslate,
    HttpError,
    getDefaultFilter,
    useExport,
    useGo,
    useNavigation,
    useList,
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
    Tree,
    Flex,
} from "antd";

import { IAccount, IAccountType } from "@/interfaces";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { PaginationTotal, UserStatus } from "@/components";
import { PropsWithChildren, useId } from "react";
import { useLocation } from "react-router-dom";
import { ListTitleButton } from "@/components/listTitleButton/list-title-button";
import { useAccountTypesSelect } from "@/hooks/useAccountTypesSelect";
import { DataNode } from "antd/es/tree";

type AccountTypesTree = IAccountType & DataNode;
export const AccountTypesList = ({ children }: PropsWithChildren) => {
    const go = useGo();
    const { pathname } = useLocation();
    const { showUrl, createUrl } = useNavigation();
    const t = useTranslate();
    const { token } = theme.useToken();
    const { data } = useList<AccountTypesTree>({
        resource: "account_types",
        filters: [
            {
                field: 'tree',
                operator: 'eq',
                value: true
            }
        ]
    });

    const accountTypes = data?.data ?? [];

    console.log(accountTypes);

//     const { tableProps, filters, sorters } = useTable<
//         IAccountType,
//         HttpError
//     >({
//         filters: {
//             mode: "off",
//         },
//         sorters: {
//             mode: "off",
//         },
//         syncWithLocation: true,
//         pagination: {
//             mode: "server",
//           },
//     });

    const { isLoading, triggerExport } = useExport<IAccountType>({
        pageSize: 50,
        maxItemCount: 50,
        mapData: (item) => {
            return {
                id: item.id,
                name: item.name,
                description: item.description
            };
        },
    });

    return (
        <List
            breadcrumb={false}
            headerButtons={(props) => [
                <ExportButton key={useId()} onClick={triggerExport} loading={isLoading} />,
                <CreateButton
                    {...props.createButtonProps}
                    key="create"
                    size="large"
                    onClick={() => {
                        return go({
                            to: `${createUrl("account_types")}`,
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
                    {t("accounts.form.add")}
                </CreateButton>,
            ]}
        >
            <Tree
                defaultExpandAll={true}
                showLine={true}
                treeData={accountTypes}
            />
            {children}
        </List>
    );

};
