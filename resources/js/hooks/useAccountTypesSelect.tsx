import { IAccountType } from "@/interfaces";
import { useSelect } from "@refinedev/antd";

export const useAccountTypesSelect = () => {
    return useSelect<IAccountType>({
        resource: "account_types",
    })
}
