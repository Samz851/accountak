import {
    useShow,
    IResourceComponentsProps,
    useNavigation,
    useBack,
} from "@refinedev/core";
import { Flex, Grid } from "antd";
import { IAccount, ITax } from "@/interfaces";
import {
    CardWithContent,
    CustomerInfoList,
    CustomerInfoSummary,
    CustomerOrderHistory,
    Drawer,
} from "@/components";
import { TaxView } from "./components/taxView";

export const TaxShow: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const back = useBack();
    const breakpoint = Grid.useBreakpoint();
    const { queryResult } = useShow<ITax>();

    const { data } = queryResult;
    const tax = data?.data;

    return (
        <Drawer
            open
            onClose={() => back()}
            width={breakpoint.sm ? "736px" : "100%"}
        >
            <TaxView tax={tax} />
        </Drawer>
    );
};
