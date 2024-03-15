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
} from "antd";

import { IAccount, IAccountFilterVariables } from "../../interfaces";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { PaginationTotal, UserStatus } from "../../components";
import { PropsWithChildren, useId } from "react";
import { useLocation } from "react-router-dom";
import { ListTitleButton } from "@/components/listTitleButton/list-title-button";
import { getColumns, getRows } from "./grid";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

export const DisplayAccountsList = ({ children }: PropsWithChildren) => {
    const go = useGo();
    const { pathname } = useLocation();
    const { show, createUrl } = useNavigation();
    const t = useTranslate();
    const { token } = theme.useToken();

    const { data } = useList<IAccount>({
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

    const { isLoading, triggerExport } = useExport<IAccount>({
        pageSize: 50,
        maxItemCount: 50,
        mapData: (item) => {
            return {
                id: item.id,
                fullName: item.account_name,
                account_branch: item.account_branch.name
            };
        },
    });

    const rows = getRows(accounts);
    const columns = getColumns();
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
            <ReactGrid rows={rows} columns={columns} />
            {children}
        </List>
    );
};
