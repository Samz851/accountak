import { AccountCreatePage } from "../accounts";
import { AccountsBranchCreatePage } from "../accountsBranches";
import { TransactionCreatePage } from "../transactions";
import { AccountStep } from "./forms/account";
import { BranchStep } from "./forms/branch";
import { TransactionStep } from "./forms/transaction";

export const FormList = [
    <>
        <TransactionStep />
    </>,
    <>
        <BranchStep />
    </>,
    <>
        <AccountStep />
    </>
]