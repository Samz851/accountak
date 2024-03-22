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
    // Table,
    Avatar,
    Typography,
    theme,
    InputNumber,
    Input,
    Select,
    Button,
    Row,
} from "antd";

import { IAccount, IAccountFilterVariables } from "../../interfaces";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { PaginationTotal, UserStatus } from "../../components";
import { PropsWithChildren, useId } from "react";
import { useLocation } from "react-router-dom";
import { ListTitleButton } from "@/components/listTitleButton/list-title-button";
import { getColumns, getRows } from "./grid";
// import { ReactGrid } from "@silevis/reactgrid";
import { Loader, Table } from 'rsuite';
import { RowDataType } from "rsuite/esm/Table";
// import "@silevis/reactgrid/styles.css";
import "rsuite/Table/styles/index.css"

const { Column, HeaderCell, Cell } = Table;

type AccountsTreeData = IAccount & RowDataType;
export const DisplayAccountsList = ({ children }: PropsWithChildren) => {
    const go = useGo();
    const { pathname } = useLocation();
    const { show, createUrl } = useNavigation();
    const t = useTranslate();
    const { token } = theme.useToken();

    const { data } = useList<AccountsTreeData>({
        resource: "accounts",
        filters: [
            {
                field: 'tree',
                operator: 'eq',
                value: true
            }
        ]
    })

    const accounts = data?.data || [];

    // const { isLoading, triggerExport } = useExport<IAccount>({
    //     pageSize: 50,
    //     maxItemCount: 50,
    //     mapData: (item) => {
    //         return {
    //             id: item.id,
    //             fullName: item.name,
    //             account_branch: item.parent.name
    //         };
    //     },
    // });

    // const rows = getRows(accounts);
    // const columns = getColumns();
    return (
        <List
            breadcrumb={false}
            headerButtons={(props) => [
                // <ExportButton key={useId()} onClick={triggerExport} loading={isLoading} />,
                <CreateButton
                    {...props.createButtonProps}
                    key="create"
                    size="large"
                    onClick={() => {
                        return go({
                            to: `${createUrl("accounts")}`,
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
            <Table
      isTree
      defaultExpandAllRows
      bordered
      cellBordered
      rowKey="code"
      height={400}
      data={accounts as any}
      /** shouldUpdateScroll: whether to update the scroll bar after data update **/
      shouldUpdateScroll={false}
      onExpandChange={(isOpen, rowData) => {
        console.log(isOpen, rowData);
      }}
      renderTreeToggle={(icon, rowData) => {
        if (rowData?.children && rowData.children.length === 0) {
          return <Loader />;
        }
        return icon;
      }}
    >
      <Column flexGrow={1}>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>
      <Column flexGrow={1}>
        <HeaderCell>Code</HeaderCell>
        <Cell dataKey="code" />
      </Column>
      <Column flexGrow={3}>
        <HeaderCell>Description</HeaderCell>
        <Cell dataKey="description" />
      </Column>
      <Column flexGrow={1}>
        <HeaderCell>Balance</HeaderCell>
        <Cell dataKey="balance" />
      </Column>
    </Table>
            {children}
        </List>
    );
};
