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
import { EyeOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { PaginationTotal, UserStatus } from "@/components";
import { PropsWithChildren, ReactNode, useId } from "react";
import { useLocation } from "react-router-dom";
import { ListTitleButton } from "@/components/listTitleButton/list-title-button";
import { useAccountTypesSelect } from "@/hooks/useAccountTypesSelect";
import { DataNode } from "antd/es/tree";

const { TreeNode } = Tree;
type AccountTypesTree = IAccountType & DataNode;
export const AccountTypesList = ({ children }: PropsWithChildren) => {
    const go = useGo();
    const { pathname } = useLocation();
    const { show, createUrl } = useNavigation();
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

    const accountTypes = data?.data ?? [{
        key: 1,
        title: t('account_types.form.first'),
        id: 1,
        name: '',
        description: '',
        accounts: []
    }];

    // const accountTypesone = (data?.data == undefined ||  ! data?.data.length) ? [{
    //     key: 1,
    //     title: t('account_types.form.first'),
    //     id: 1,
    //     name: '',
    //     description: '',
    //     accounts: []
    // }] : data?.data;

    // console.log(accountTypes, typeof accountTypes)
    // console.log(data?.data, typeof data?.data)
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

    const addType = (parent?) => {
        return go({
            to: `${createUrl("account_types")}`,
            query: {
                to: pathname,
                parent: parent
            },
            options: {
                keepQuery: true,
            },
            type: "replace",
        });
    }

    return (
        <List
            breadcrumb={false}
            headerButtons={(props) => [
                <ExportButton key={useId()} onClick={triggerExport} loading={isLoading} />,
                <CreateButton
                    {...props.createButtonProps}
                    key="create"
                    size="large"
                    onClick={() => addType()}
                >
                    {t("account_types.form.add")}
                </CreateButton>,
            ]}
        >
            <Tree
                selectable={false}
                defaultExpandAll={true}
                blockNode={true}
                showLine={true}
                treeData={accountTypes}
                titleRender={(item) =>
                    <Flex justify="space-between">
                        <Typography.Link
                        strong
                        onClick={() => show("account_types", item.key as any, "push")}
                        style={{
                            whiteSpace: "nowrap",
                            color: token.colorTextHeading,
                        }}
                        >
                            {item?.title as any}
                        </Typography.Link>
                        <Button
                            icon={<PlusCircleOutlined/>}
                            onClick={() => addType(item.key)} 
                        />
                    </Flex>
                }
            />
            {/* <Tree
                selectable={false}
                showLine={true}
                blockNode={true}
            >
                {
                    // accountTypes.length > 0 ?
                        accountTypes.map((data) => (
                            <TreeNode
                                title={() => (
                                    <Flex justify="space-between">
                                        <Typography.Text>{data.title as any}</Typography.Text>
                                        <Typography.Text>Got it</Typography.Text>
                                        <Typography.Text>{JSON.stringify(data)}</Typography.Text>
                                        <Button
                                            icon={<PlusCircleOutlined/>}
                                            onClick={() => addType(data.key)} 
                                        />
                                    </Flex>
                                )}
                                key={data.key}
                            />
                        ))
                }
            </Tree> */}
            {children}
        </List>
    );

};
