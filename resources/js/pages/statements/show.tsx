import {
    useShow,
    IResourceComponentsProps,
    useNavigation,
    useBack,
} from "@refinedev/core";
import { Flex, Grid } from "antd";
import { ICompany, IContact, IStatement } from "@/interfaces";
import {
    CardWithContent,
    CustomerInfoList,
    CustomerInfoSummary,
    CustomerOrderHistory,
    Drawer,
} from "@/components";
import { useEffect } from "react";

export const StatementShow: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const back = useBack();
    const breakpoint = Grid.useBreakpoint();
    const { queryResult } = useShow<IStatement>();

    const { data } = queryResult;
    // const company = data?.data;

    useEffect(()=>{
        console.log(queryResult, data);

    },[queryResult])
    return (
        <Drawer
            open
            onClose={() => back()}
            width={breakpoint.sm ? "736px" : "100%"}
        >
            {/* <CompanyView company={company} /> */}
        </Drawer>
    );
};
