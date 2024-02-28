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
    const { data, isLoading } = useList<AccountTypesTree>({
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

    return (
        <Tree
            defaultExpandAll={true}
            showLine={true}
            treeData={accountTypes}
            titleRender={(node) => (
                <Flex vertical>
                    <div>
                        <Typography.Text strong>
                            {node.title as any}
                        </Typography.Text>
                    </div>
                    {/* <div>
                        <Typography.Text ellipsis>
                            {node.description as any}
                        </Typography.Text>
                    </div> */}
                </Flex>
            )}
        />
    )

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

//     const { isLoading, triggerExport } = useExport<IAccountType>({
//         sorters,
//         filters,
//         pageSize: 50,
//         maxItemCount: 50,
//         mapData: (item) => {
//             return {
//                 id: item.id,
//                 name: item.name,
//                 description: item.description
//             };
//         },
//     });

//     return (
//         <List
//             breadcrumb={false}
//             headerButtons={(props) => [
//                 <ExportButton key={useId()} onClick={triggerExport} loading={isLoading} />,
//                 <CreateButton
//                     {...props.createButtonProps}
//                     key="create"
//                     size="large"
//                     onClick={() => {
//                         return go({
//                             to: `${createUrl("account_types")}`,
//                             query: {
//                                 to: pathname,
//                             },
//                             options: {
//                                 keepQuery: true,
//                             },
//                             type: "replace",
//                         });
//                     }}
//                 >
//                     {t("accounts.form.add")}
//                 </CreateButton>,
//             ]}
//         >
//             <Table
//                 {...tableProps}
//                 rowKey="id"
//                 scroll={{ x: true }}
//                 pagination={{
//                     ...tableProps.pagination,
//                     showTotal: (total) => (
//                         <PaginationTotal total={total} entityName="account_types" />
//                     ),
//                 }}
//             >
//                 <Table.Column
//                     key="id"
//                     dataIndex="id"
//                     title="ID #"
//                     render={(value) => (
//                         <Typography.Text
//                             style={{
//                                 whiteSpace: "nowrap",
//                             }}
//                         >
//                             #{value}
//                         </Typography.Text>
//                     )}
//                     filterIcon={(filtered) => (
//                         <SearchOutlined
//                             style={{
//                                 color: filtered
//                                     ? token.colorPrimary
//                                     : undefined,
//                             }}
//                         />
//                     )}
//                     defaultFilteredValue={getDefaultFilter(
//                         "orderNumber",
//                         filters,
//                         "eq",
//                     )}
//                     filterDropdown={(props) => (
//                         <FilterDropdown {...props}>
//                             <InputNumber
//                                 addonBefore="#"
//                                 style={{ width: "100%" }}
//                                 placeholder={t("orders.filter.id.placeholder")}
//                             />
//                         </FilterDropdown>
//                     )}
//                 />
//                 <Table.Column
//                     key="name"
//                     dataIndex="name"
//                     title={t("users.fields.name")}
//                     defaultFilteredValue={getDefaultFilter(
//                         "name",
//                         filters,
//                         "contains",
//                     )}
//                     filterDropdown={(props) => (
//                         <FilterDropdown {...props}>
//                             <Input
//                                 style={{ width: "100%" }}
//                                 placeholder={t("users.filter.name.placeholder")}
//                             />
//                         </FilterDropdown>
//                     )}
//                 />
//                 <Table.Column
//                     key="description"
//                     dataIndex="description"
//                     title={t("accounts.fields.account_type")}
//                     defaultFilteredValue={getDefaultFilter(
//                         "description",
//                         filters,
//                         "contains",
//                     )}
//                     filterDropdown={(props) => (
//                         <FilterDropdown {...props}>
//                             <Input
//                                 style={{ width: "100%" }}
//                                 placeholder={t("users.filter.gsm.placeholder")}
//                             />
//                         </FilterDropdown>
//                     )}
//                     // render={(value) => (
//                     //     <Typography.Text
//                     //     style={{
//                     //         whiteSpace: "nowrap",
//                     //     }}
//                     // >
//                     //     {value.name}
//                     // </Typography.Text>
//                     // )}
//                 />
//                 <Table.Column<IAccount>
//                     key="parent_account"
//                     dataIndex={["parent_account", "account_name"]}
//                     title={t("accounts.fields.parent_account")}
//                     // render={(_, value) => (
//                     //     <Typography.Text
//                     //     style={{
//                     //         whiteSpace: "nowrap",
//                     //     }}
//                     // >
//                     //     {value?.parent_account?.account_name}
//                     // </Typography.Text>
//                     // )}
//                 />
//                 <Table.Column<IAccount>
//                     key="child_accounts"
//                     dataIndex={["child_accounts"]}
//                     title={t("accounts.fields.child_accounts")}
//                     render={(_, value) =>
//                         value.child_accounts.map(child => (
//                             <Row key={child?.id}>

//                                 <Typography.Text
//                                     style={{
//                                         whiteSpace: "nowrap",
//                                     }}
//                                 >
//                                     {child?.account_name}
//                                 </Typography.Text>
//                             </Row>
//                         ))
//                     }
//                 />
//                 {/* <Table.Column
//                     key="createdAt"
//                     dataIndex="createdAt"
//                     title={t("users.fields.createdAt")}
//                     render={(value) => <DateField value={value} format="LLL" />}
//                     sorter
//                 />
//                 <Table.Column
//                     key="isActive"
//                     dataIndex="isActive"
//                     title={t("users.fields.isActive.label")}
//                     render={(value) => {
//                         return <UserStatus value={value} />;
//                     }}
//                     sorter
//                     defaultSortOrder={getDefaultSortOrder("isActive", sorters)}
//                     filterDropdown={(props) => (
//                         <FilterDropdown {...props}>
//                             <Select
//                                 style={{ width: "100%" }}
//                                 placeholder={t(
//                                     "users.filter.isActive.placeholder",
//                                 )}
//                             >
//                                 <Select.Option value="true">
//                                     {t("users.fields.isActive.true")}
//                                 </Select.Option>
//                                 <Select.Option value="false">
//                                     {t("users.fields.isActive.false")}
//                                 </Select.Option>
//                             </Select>
//                         </FilterDropdown>
//                     )}
//                 /> */}
//                 <Table.Column<IAccount>
//                     fixed="right"
//                     title={t("table.actions")}
//                     render={(_, record) => (
//                         <Button
//                             icon={<EyeOutlined />}
//                             onClick={() => {
//                                 return go({
//                                     to: `${showUrl("accounts", record.id)}`,
//                                     query: {
//                                         to: pathname,
//                                     },
//                                     options: {
//                                         keepQuery: true,
//                                     },
//                                     type: "replace",
//                                 });
//                             }}
//                         />
//                     )}
//                 />
//             </Table>
//             {children}
//         </List>
//     );

};
