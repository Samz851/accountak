import {
    useShow,
    IResourceComponentsProps,
    useNavigation,
    useBack,
} from "@refinedev/core";
import { Flex, Grid } from "antd";
import { IAccount, IAccountType } from "../../interfaces";
import {
    CardWithContent,
    CustomerInfoList,
    CustomerInfoSummary,
    CustomerOrderHistory,
    Drawer,
} from "../../components";
import { AccountTypeView } from "./components/accountTypeView";

export const AccountTypeShow: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const breakpoint = Grid.useBreakpoint();
    const { queryResult } = useShow<IAccountType>();
    const back = useBack();

    const { data } = queryResult;
    const accountType = data?.data;

    return (
        <Drawer
            open
            onClose={() => back()}
            width={breakpoint.sm ? "736px" : "100%"}
        >
            <AccountTypeView accountType={accountType} />
        </Drawer>
    );
};
