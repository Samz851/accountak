import { OptionsOutletContextType, IIdentityObject, IOptions } from "@/interfaces"
import { Show } from "@refinedev/antd";
import { useGetIdentity, useShow } from "@refinedev/core"
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export const ShowOptions = () => {
    // const { id } = useOutletContext<OptionsOutletContextType>();

    const { queryResult} = useShow<IOptions>({
        resource: "options"
    });
    const { data, isLoading } = queryResult;
    const record = data?.data;

    // useEffect(()=>{
    //     if (identity?.organization?.options.id !== undefined && identity?.organization?.options.id > 0 ) setShowId(identity?.organization?.options.id)
    //   },[identity]);

    return (
        <Show
            isLoading={isLoading}
            canEdit={true}
        >
            <div>Fiscal Cycle: {record?.fiscal_cycle}</div>
            <div>Fiscal Year Start: {record?.fiscal_year_start}</div>
        </Show>
    )
}