import {
    useShow,
    IResourceComponentsProps,
    useNavigation,
    useBack,
} from "@refinedev/core";
import { Flex, Grid } from "antd";
import { IAccount, IAccountsBranch } from "../../interfaces";
import {
    CardWithContent,
    CustomerInfoList,
    CustomerInfoSummary,
    CustomerOrderHistory,
    Drawer,
} from "../../components";
import { AccountsBranchView } from "./components/accountTypeView";

export const AccountsBranchShow: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const breakpoint = Grid.useBreakpoint();
    const { queryResult } = useShow<IAccountsBranch>();
    const back = useBack();

    const { data } = queryResult;
    const accountType = data?.data;

    return (
        <Drawer
            open
            onClose={() => back()}
            width={breakpoint.sm ? "736px" : "100%"}
        >
            <AccountsBranchView accountType={accountType} />
        </Drawer>
    );
};
