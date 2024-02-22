import { IAccount } from "@/interfaces";
import { useSelect } from "@refinedev/antd";
import { useApiUrl, useCustom } from "@refinedev/core";
import { forEach } from "lodash";

interface PostUniqueCheckResponse {
    isAvailable: boolean;
  }

export const useAccountsSelectCustom = () => {
    const apiUrl = useApiUrl("laravel");
    return useCustom<IAccount[]>({
        url: `${apiUrl}/accounts/select`,
        method: "get",
        config: {
            query: {
                title: "Foo bar",
            }
        }

    })
}
export const useAccountsSelect = () => {
    return useSelect<IAccount>({
        resource: "accounts",
        queryOptions: {
            select: (data) => {
                console.log(data, 'select data');
                return data;
            }
        }
    })
}
