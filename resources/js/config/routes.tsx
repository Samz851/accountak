import { ReactElement } from "react";
import { Route, Outlet } from "react-router-dom";
import { DashboardPage } from "@/pages/dashboard";
import { OrderList, OrderShow } from "@/pages/orders";
import { CustomerShow, CustomerList } from "@/pages/customers";
import { AccountCreatePage, AccountShow, AccountsList } from "@/pages/accounts";
import { TransactionCreatePage, TransactionsList } from "@/pages/transactions";
import { TaxesList, TaxCreatePage } from "@/pages/taxes";

import {
    CourierList,
    CourierShow,
    CourierCreate,
    CourierEdit,
} from "@/pages/couriers";
import {
    ProductList,
    ProductCreate,
    ProductEdit,
    ProductShow,
} from "@/pages/products";
import { StoreCreate, StoreEdit, StoreList } from "@/pages/stores";
import { CategoryList } from "@/pages/categories";
import { CompaniesList, CompanyCreatePage } from "@/pages/companies";
import { ContactCreatePage, ContactsList } from "@/pages/contacts";
import { CompanyShow } from "@/pages/companies/show";
export const routes: ReactElement[] = [
    <Route index element={<DashboardPage />} />,
    <Route path="/companies">
        <Route index element={<CompaniesList />} />
        <Route
            path="show/:id"
            element={<CompanyShow />}
        />
        <Route
        path="create"
        element={<CompanyCreatePage />}
        />
    </Route>,
    <Route path="/contacts">
        <Route index element={<ContactsList />} />
        <Route
            path="show/:id"
            element={<AccountShow />}
        />
        <Route
        path="create"
        element={<ContactCreatePage />}
        />
    </Route>,
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
    </Route>,
    <Route path="/transactions">
        <Route index element={<TransactionsList />} />
        <Route
            path="create"
            element={<TransactionCreatePage />} />
    </Route>,
    <Route path="/taxes">
        <Route index element={<TaxesList />} />
        <Route
            path="create"
            element={<TaxCreatePage />} />
    </Route>,
    <Route path="/orders">
        <Route index element={<OrderList />} />
        <Route
            path="show/:id"
            element={<OrderShow />}
        />
    </Route>,
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
    </Route>,
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
    </Route>,
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
    </Route>,
    <Route
        path="/categories"
        element={<CategoryList />}
    />,
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
    </Route>
]
