import type { IResourceItem } from "@refinedev/core";

import {
    AccountBookOutlined,
    ContainerOutlined,
    CrownOutlined,
    DashboardOutlined,
    AppstoreOutlined,
    ShopOutlined,
    TeamOutlined,
    MoneyCollectOutlined,
    TransactionOutlined,
    StrikethroughOutlined
} from "@ant-design/icons";

export const resources: IResourceItem[] = [
    {
        name: "dashboard",
        list: "/",
        meta: {
            label: "Dashboard",
            icon: <DashboardOutlined />,
        },
    },
    {
        name: "companies",
        list: "/companies",
        show: "/companies/:id",
        create: "/companies/create",
        edit: "/companies/edit/:id",
        meta: {
            label: "Companies",
            icon: <ShopOutlined />,
        },
    },
    {
        name: "Accounts",
        list: "/accounts",
        create: "/accounts/create",
        edit: "/accounts/edit/:id",
        show: "/accounts/show/:id",
        meta: {
            label: "Accounts",
            icon: <AccountBookOutlined />,
        },
    },
    {
        name: "Contacts",
        list: "/contact",
        create: "/contact/create",
        edit: "/contact/edit/:id",
        show: "/contact/show/:id",
        meta: {
            label: "Contacts",
            icon: <TeamOutlined />,
        },
    },
    {
        name: "Invoices",
        list: "/invoice",
        create: "/invoice/create",
        edit: "/invoice/edit/:id",
        show: "/invoice/show/:id",
        meta: {
            label: "Invoices",
            icon: <ContainerOutlined />,
        },
    },
    {
        name: "Payments",
        list: "/payment",
        create: "/payment/create",
        edit: "/payment/edit/:id",
        show: "/payment/show/:id",
        meta: {
            label: "Payments",
            icon: <ContainerOutlined />,
        },
    },
    {
        name: "Bills",
        list: "/bill",
        create: "/bill/create",
        edit: "/bill/edit/:id",
        show: "/bill/show/:id",
        meta: {
            label: "Bills",
            icon: <ContainerOutlined />,
        },
    },
    {
        name: "Taxes",
        list: "/tax",
        create: "/tax/create",
        edit: "/tax/edit/:id",
        show: "/tax/show/:id",
        meta: {
            label: "Taxes",
            icon: <MoneyCollectOutlined />,
        },
    },
    {
        name: "Transactions",
        list: "/trans_record",
        create: "/trans_record/create",
        edit: "/trans_record/edit/:id",
        show: "/trans_record/show/:id",
        meta: {
            label: "Transactions",
            icon: <TransactionOutlined />,
        },
    },
    {
        name: "Transaction Taxes",
        list: "/trans_tax",
        create: "/trans_tax/create",
        edit: "/trans_tax/edit/:id",
        show: "/trans_tax/show/:id",
        meta: {
            label: "Transaction Taxes",
            icon: <StrikethroughOutlined />,
        },
    },


    {
        name: "Invoice",
        list: "/scrumboard/kanban",
        create: "/scrumboard/kanban/create",
        edit: "/scrumboard/kanban/edit/:id",
        meta: {
            label: "Project Kanban",
            parent: "scrumboard",
        },
    },
    {
        name: "taskStages",
        create: "/scrumboard/kanban/stages/create",
        edit: "/scrumboard/kanban/stages/edit/:id",
        list: "/scrumboard/kanban",
        meta: {
            hide: true,
        },
    },
    {
        name: "deals",
        list: "/scrumboard/sales",
        create: "/scrumboard/sales/create",
        edit: "/scrumboard/sales/edit/:id",
        meta: {
            label: "Sales Pipeline",
            parent: "scrumboard",
        },
    },
    {
        name: "deals",
        identifier: "finalize-deals",
        edit: "/scrumboard/sales/:id/finalize",
        meta: {
            hide: true,
        },
    },
    {
        name: "dealStages",
        create: "/scrumboard/sales/stages/create",
        edit: "/scrumboard/sales/stages/edit/:id",
        list: "/scrumboard/sales",
        meta: {
            hide: true,
        },
    },
    // {
    //     name: "companies",
    //     identifier: "sales-companies",
    //     create: "/scrumboard/sales/create/company/create",
    //     meta: {
    //         hide: true,
    //     },
    // },
    {
        name: "contacts",
        list: "/contacts",
        create: "/contacts/create",
        edit: "/contacts/edit/:id",
        show: "/contacts/show/:id",
        meta: {
            label: "Contacts",
            icon: <TeamOutlined />,
        },
    },
    {
        name: "quotes",
        list: "/quotes",
        create: "/quotes/create",
        edit: "/quotes/edit/:id",
        show: "/quotes/show/:id",
        meta: {
            label: "Quotes",
            icon: <ContainerOutlined />,
        },
    },
    {
        name: "administration",
        meta: {
            label: "Administration",
            icon: <CrownOutlined />,
        },
    },
    {
        name: "settings",
        list: "/administration/settings",
        meta: {
            label: "Settings",
            parent: "administration",
        },
    },
    {
        name: "audits",
        list: "/administration/audit-log",
        meta: {
            label: "Audit Log",
            parent: "administration",
        },
    },
];
