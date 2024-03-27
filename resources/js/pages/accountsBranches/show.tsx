import {
    useShow,
    IResourceComponentsProps, useBack
} from "@refinedev/core";
import { Grid } from "antd";
import { IAccountsBranch } from "@/interfaces";
import {
    Drawer
} from "@/components";
import { AccountsBranchView } from "./components/accountsBranchView";

export const AccountsBranchShow: React.FC<IResourceComponentsProps> = () => {
    const breakpoint = Grid.useBreakpoint();
    const { queryResult } = useShow<IAccountsBranch>();
    const back = useBack();

    const { data } = queryResult;
    const accountsBranch = data?.data;

    return (
        <Drawer
            open
            onClose={() => back()}
            width={breakpoint.sm ? "736px" : "100%"}
        >
            <AccountsBranchView accountsBranch={accountsBranch} />
        </Drawer>
    );
};
