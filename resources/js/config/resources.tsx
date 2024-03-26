import type { IResourceItem } from "@refinedev/core";
import {
    ShoppingOutlined,
    ShopOutlined,
    DashboardOutlined,
    UserOutlined,
    UnorderedListOutlined,
    TagsOutlined,
} from "@ant-design/icons";

import { BikeWhiteIcon } from "../components/icons";

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
        name: "accounts_branches",
        list: "/accounts_branches",
        show: "/accounts_branches/show/:id",
        create: "/accounts_branches/create",
        meta: {
            dataProviderName: "laravel",
            // hide: true
        }
    },
    {
        name: "accounts",
        list: "/accounts",
        create: "/accounts/create",
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
        create: "/transactions/create",
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
    // {
    //     name: "orders",
    //     list: "/orders",
    //     show: "/orders/show/:id",
    //     meta: {
    //         icon: <ShoppingOutlined />,
    //     },
    // },
    // {
    //     name: "users",
    //     list: "/customers",
    //     show: "/customers/show/:id",
    //     meta: {
    //         icon: <UserOutlined />,
    //     },
    // },
    // {
    //     name: "products",
    //     list: "/products",
    //     create: "/products/create",
    //     edit: "/products/edit/:id",
    //     show: "/products/show/:id",
    //     meta: {
    //         icon: <UnorderedListOutlined />,
    //     },
    // },
    // {
    //     name: "categories",
    //     list: "/categories",
    //     meta: {
    //         icon: <TagsOutlined />,
    //     },
    // },
    // {
    //     name: "stores",
    //     list: "/stores",
    //     create: "/stores/create",
    //     edit: "/stores/edit/:id",
    //     meta: {
    //         icon: <ShopOutlined />,
    //     },
    // },
    // {
    //     name: "couriers",
    //     list: "/couriers",
    //     create: "/couriers/create",
    //     edit: "/couriers/edit/:id",
    //     show: "/couriers/show/:id",
    //     meta: {
    //         icon: <BikeWhiteIcon />,
    //     },
    // },
]
