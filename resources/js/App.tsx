import React from "react";
import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import {
    useNotificationProvider,
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

import { AuthPage } from "./pages/auth";
import { useTranslation } from "react-i18next";
import { ThemedLayoutV2, Header, Title } from "./components";
import { ConfigProvider } from "./context";
import { useAutoLoginForDemo } from "./hooks";

import "@refinedev/antd/dist/reset.css";
import { resources } from "./config/resources";
import { routes } from "./config/routes";

const App: React.FC = () => {
    // This hook is used to automatically login the user.
    // We use this hook to skip the login page and demonstrate the application more quickly.
    // const { loading } = useAutoLoginForDemo();
    const { PROD, VITE_DEV_APP_URL, VITE_PROD_APP_URL} = import.meta.env;
    const API_URL = "https://api.finefoods.refine.dev";
    const LARAVEL_API_URL = `${ PROD 
                                ? VITE_PROD_APP_URL
                                : VITE_DEV_APP_URL
                            }/api`;
    const laravelDataProvider = jsonServerDataProvider(LARAVEL_API_URL);
    const dataProvider = jsonServerDataProvider(API_URL);

    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    // if (loading) {
    //     return null;
    // }

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
                                            {/* <div
                                                style={{
                                                    // maxWidth: "1200px",
                                                    marginLeft: "auto",
                                                    marginRight: "auto",
                                                }}
                                            > */}
                                                <Outlet />
                                            {/* </div> */}
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                {...routes}
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
                                                    email: "samer@example.com",
                                                    password: "password",
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
