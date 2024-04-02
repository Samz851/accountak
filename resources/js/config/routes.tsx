import { ReactElement } from "react";
import { Route } from "react-router-dom";
import { DashboardPage } from "@/pages/dashboard";
import { AccountCreatePage, AccountShow, AccountsList } from "@/pages/accounts";
import { TransactionCreatePage, TransactionsList } from "@/pages/transactions";
import { TaxesList, TaxCreatePage } from "@/pages/taxes";

import { CompaniesList, CompanyCreatePage } from "@/pages/companies";
import { ContactCreatePage, ContactsList } from "@/pages/contacts";
import { CompanyShow } from "@/pages/companies/show";
import { ContactShow } from "@/pages/contacts/show";
import { TaxShow } from "@/pages/taxes/show";
import { AccountsBranchCreatePage, AccountsBranchShow } from "@/pages/accountsBranches";
import { AccountsBranchesListPage } from "@/pages/accountsBranches/newlist";
import { CreateGeneralPage } from "@/pages/create";
import { SetupPage } from "@/pages/setup";
export const routes: ReactElement[] = [
    <Route index element={<DashboardPage />} />,
    <Route path="/setup" element={<SetupPage />} />,
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
            element={<ContactShow />}
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
            element={<CreateGeneralPage />}
        />
    </Route>,
    <Route path="/transactions">
        <Route index element={<TransactionsList />} />
        <Route
            path="create"
            element={<CreateGeneralPage />} />
    </Route>,
    // <Route path="/statements">
    //     <Route index element={<StatementCreatePage />} />
    // </Route>,
    <Route path="/taxes">
        <Route index element={<TaxesList />} />
        <Route
            path="show/:id"
            element={<TaxShow />}
        />
        <Route
            path="create"
            element={<TaxCreatePage />} />
    </Route>,
    <Route path="/accounts_branches">
        <Route index element={<AccountsBranchesListPage />} />
        <Route
            path="show/:id"
            element={<AccountsBranchShow />}
        />
        <Route
            path="create"
            element={<CreateGeneralPage />}
        />
    </Route>,
    // <Route path="/orders">
    //     <Route index element={<OrderList />} />
    //     <Route
    //         path="show/:id"
    //         element={<OrderShow />}
    //     />
    // </Route>,
    <Route path="/create_general">
        <Route index element={<CreateGeneralPage />} />
    </Route>
]
