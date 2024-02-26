import React from "react";
import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import {
    useNotificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
} from "@refinedev/antd";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import jsonServerDataProvider from "@refinedev/simple-rest";
import { authProvider } from "./providers/authProvider";

import "dayjs/locale/de";

import { DashboardPage } from "./pages/dashboard";
import { OrderList, OrderShow } from "./pages/orders";
import { AuthPage } from "./pages/auth";
import { CustomerShow, CustomerList } from "./pages/customers";
import {
    CourierList,
    CourierShow,
    CourierCreate,
    CourierEdit,
} from "./pages/couriers";
import {
    ProductList,
    ProductCreate,
    ProductEdit,
    ProductShow,
} from "./pages/products";
import { StoreCreate, StoreEdit, StoreList } from "./pages/stores";
import { CategoryList } from "./pages/categories";
import { useTranslation } from "react-i18next";
import { Header, Title } from "./components";
import { BikeWhiteIcon } from "./components/icons";
import { ConfigProvider } from "./context";
import { useAutoLoginForDemo } from "./hooks";

import "@refinedev/antd/dist/reset.css";
import { AccountCreatePage, AccountShow, AccountsList } from "./pages/accounts";
import { TransactionCreatePage, TransactionsList } from "./pages/transactions";
import { TaxesList, TaxCreatePage } from "./pages/taxes";
import { resources } from "./config/resources";
import { routes } from "./config/routes";

const App: React.FC = () => {
    // This hook is used to automatically login the user.
    // We use this hook to skip the login page and demonstrate the application more quickly.
    const { loading } = useAutoLoginForDemo();

    const API_URL = "https://api.finefoods.refine.dev";
    const LARAVEL_API_URL = "http://localhost/api";
    const laravelDataProvider = jsonServerDataProvider(LARAVEL_API_URL);
    const dataProvider = jsonServerDataProvider(API_URL);

    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    if (loading) {
        return null;
    }

    return (
        <BrowserRouter>
            <ConfigProvider>
                <RefineKbarProvider>
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={{
                            default: dataProvider,
                            laravel: laravelDataProvider
                        }}
                        authProvider={authProvider}
                        i18nProvider={i18nProvider}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                        notificationProvider={useNotificationProvider}
                        resources={resources}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        key="authenticated-routes"
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2
                                            Header={Header}
                                            Title={Title}
                                        >
                                            <div
                                                style={{
                                                    maxWidth: "1200px",
                                                    marginLeft: "auto",
                                                    marginRight: "auto",
                                                }}
                                            >
                                                <Outlet />
                                            </div>
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                {...routes}
                                {/* <Route index element={<DashboardPage />} />

                                <Route path="/accounts">
                                    <Route index element={<AccountsList />} />
                                    <Route
                                        path="show/:id"
                                        element={<AccountShow />}
                                    />
                                     <Route
                                        path="create"
                                        element={<AccountCreatePage />}
                                    />
                                </Route>

                                <Route path="/transactions">
                                    <Route index element={<TransactionsList />} />
                                    <Route
                                        path="create"
                                        element={<TransactionCreatePage />} />
                                </Route>

                                <Route path="/taxes">
                                    <Route index element={<TaxesList />} />
                                    <Route
                                        path="create"
                                        element={<TaxCreatePage />} />
                                </Route>

                                <Route path="/orders">
                                    <Route index element={<OrderList />} />
                                    <Route
                                        path="show/:id"
                                        element={<OrderShow />}
                                    />
                                </Route>

                                <Route
                                    path="/customers"
                                    element={
                                        <CustomerList>
                                            <Outlet />
                                        </CustomerList>
                                    }
                                >
                                    <Route index element={null} />
                                    <Route
                                        path="show/:id"
                                        element={<CustomerShow />}
                                    />
                                </Route>

                                <Route
                                    path="/products"
                                    element={
                                        <ProductList>
                                            <Outlet />
                                        </ProductList>
                                    }
                                >
                                    <Route index element={null} />
                                    <Route
                                        path="create"
                                        element={<ProductCreate />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<ProductShow />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<ProductEdit />}
                                    />
                                </Route>

                                <Route path="/stores">
                                    <Route index element={<StoreList />} />
                                    <Route
                                        path="create"
                                        element={<StoreCreate />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<StoreEdit />}
                                    />
                                </Route>

                                <Route
                                    path="/categories"
                                    element={<CategoryList />}
                                />

                                <Route path="/couriers">
                                    <Route
                                        element={
                                            <CourierList>
                                                <Outlet />
                                            </CourierList>
                                        }
                                    >
                                        <Route index element={null} />
                                        <Route
                                            path="create"
                                            element={<CourierCreate />}
                                        />
                                    </Route>

                                    <Route
                                        path="edit/:id"
                                        element={<CourierEdit />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<CourierShow />}
                                    />
                                </Route> */}
                            </Route>

                            <Route
                                element={
                                    <Authenticated
                                        key="auth-pages"
                                        fallback={<Outlet />}
                                    >
                                        <NavigateToResource resource="dashboard" />
                                    </Authenticated>
                                }
                            >
                                <Route
                                    path="/login"
                                    element={
                                        <AuthPage
                                            type="login"
                                            formProps={{
                                                initialValues: {
                                                    email: "demo@refine.dev",
                                                    password: "demodemo",
                                                },
                                            }}
                                        />
                                    }
                                />
                                <Route
                                    path="/register"
                                    element={
                                        <AuthPage
                                            type="register"
                                            formProps={{
                                                initialValues: {
                                                    email: "demo@refine.dev",
                                                    password: "demodemo",
                                                },
                                            }}
                                        />
                                    }
                                />
                                <Route
                                    path="/forgot-password"
                                    element={<AuthPage type="forgotPassword" />}
                                />
                                <Route
                                    path="/update-password"
                                    element={<AuthPage type="updatePassword" />}
                                />
                            </Route>

                            <Route
                                element={
                                    <Authenticated key="catch-all">
                                        <ThemedLayoutV2
                                            Header={Header}
                                            Title={Title}
                                        >
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </RefineKbarProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
