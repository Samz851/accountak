import type { IResourceItem } from "@refinedev/core";
import {
    DashboardOutlined
} from "@ant-design/icons";


import i18next from "i18next";

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
        create: "/companies/create",
        show: "/companies/show/:id",
        meta: {
            label: i18next.t("companies.companies"),
            icon: <DashboardOutlined />,
            dataProviderName: "laravel"
        },
    },
    {
        name: "contacts",
        list: "/contacts",
        show: "/contacts/show/:id",
        create: "/contacts/create",
        meta: {
            label: i18next.t("contacts.contacts"),
            icon: <DashboardOutlined />,
            dataProviderName: "laravel"
        },
    },
    {
        name: "taxes",
        list: "/taxes",
        show: "/taxes/show/:id",
        create: "/taxes/create",
        meta: {
            label: i18next.t("taxes.taxes"),
            icon: <DashboardOutlined />,
            dataProviderName: "laravel"
        },
    },
    {
        name: "branches",
        list: "/branches",
        show: "/branches/show/:id",
        create: "/create/branches",
        meta: {
            dataProviderName: "laravel",
            // hide: true
        }
    },
    {
        name: "accounts",
        list: "/accounts",
        create: "/create/accounts",
        show: "/accounts/show/:id",
        meta: {
            label: i18next.t("accounts.accounts"),
            icon: <DashboardOutlined />,
            dataProviderName: "laravel"
        },
    },
    {
        name: "transactions",
        list: "/transactions",
        create: "/create/transactions",
        meta: {
            label: i18next.t("transactions.transactions"),
            icon: <DashboardOutlined />,
            dataProviderName: "laravel"
        },
    },
    {
        name: "statements",
        list: "/statements",
        create: "/statements/create",
        show: "/statements/show/:id",
        meta: {
            label: i18next.t("companies.companies"),
            icon: <DashboardOutlined />,
            dataProviderName: "laravel"
        },
    },
    {
        name: "dev_sample",
        list: "/dev_sample",
        create: "/dev_sample/create",
        show: "/dev_sample/show/:id",
        meta: {
            label: "dev_sample",
            icon: <DashboardOutlined />,
            dataProviderName: "laravel"
        }
    },
    {
        name: "create_general",
        list: "/create_general",
    },

]
