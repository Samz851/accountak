import { IAccountsBranch } from "@/interfaces";
import { useApiUrl, useCustom } from "@refinedev/core";

export const useAccountTypesSelect = () => {
    const apiUrl = useApiUrl("laravel");
    return useCustom<IAccountsBranch[]>({
        url: `${apiUrl}/accounts_branches`,
        method: "get",
        config: {
            query: {
                selectOptions: true
            }
        }
    })
}
