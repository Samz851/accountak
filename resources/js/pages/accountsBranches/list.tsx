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

import { useStyles } from "./styled";
import { IAccount, IAccountsBranch } from "@/interfaces";
import { DownCircleOutlined, EyeOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { PaginationTotal, UserStatus } from "@/components";
import { PropsWithChildren, ReactNode, useId } from "react";
import { useLocation } from "react-router-dom";
import { ListTitleButton } from "@/components/listTitleButton/list-title-button";
import { DataNode } from "antd/es/tree";

const { TreeNode } = Tree;
type AccountsBranchesTree = IAccountsBranch & DataNode;
export const AccountsBranchesList = ({ children }: PropsWithChildren) => {
    const go = useGo();
    const { styles } = useStyles();
    const { pathname } = useLocation();
    const { show, createUrl } = useNavigation();
    const t = useTranslate();
    const { token } = theme.useToken();
    const { data } = useList<AccountsBranchesTree>({
        resource: "accounts_branches",
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
        title: t('accounts_branches.form.first'),
        id: 1,
        name: '',
        description: '',
        code: '0000'
    }];

    // const accountTypesone = (data?.data == undefined ||  ! data?.data.length) ? [{
    //     key: 1,
    //     title: t('accounts_branches.form.first'),
    //     id: 1,
    //     name: '',
    //     description: '',
    //     accounts: []
    // }] : data?.data;

    // console.log(accountTypes, typeof accountTypes)
    // console.log(data?.data, typeof data?.data)
//     const { tableProps, filters, sorters } = useTable<
//         IAccountsBranch,
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

    const { isLoading, triggerExport } = useExport<IAccountsBranch>({
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
            to: `${createUrl("accounts_branches")}`,
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
                // // <ExportButton key={useId()} onClick={triggerExport} loading={isLoading} />,
                <CreateButton
                    {...props.createButtonProps}
                    key="create"
                    size="large"
                    onClick={() => addType()}
                >
                    {t("accounts_branches.form.add")}
                </CreateButton>,
            ]}
        >
            <Tree
                className={styles.treeNode}
                selectable={false}
                defaultExpandAll={true}
                blockNode={true}
                switcherIcon={<DownCircleOutlined />}
                showLine={false}
                treeData={accountTypes}
                titleRender={(item) =>
                    <Flex justify="space-between">
                        <Typography.Link
                        strong
                        onClick={() => show("accounts_branches", item.key as any, "push")}
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
