import { IAccountType } from "@/interfaces";
import { useApiUrl, useCustom } from "@refinedev/core";

export const useAccountTypesSelect = () => {
    const apiUrl = useApiUrl("laravel");
    return useCustom<IAccountType[]>({
        url: `${apiUrl}/account_types`,
        method: "get",
        config: {
            query: {
                selectOptions: true
            }
        }
    })
}
