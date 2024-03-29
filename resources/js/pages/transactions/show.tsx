import {
    useShow,
    IResourceComponentsProps,
    useNavigation,
} from "@refinedev/core";
import { Flex, Grid } from "antd";
import { IAccount } from "@/interfaces";
import { CardWithContent, Drawer } from "@/components";

export const AccountShow: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const breakpoint = Grid.useBreakpoint();
    const { queryResult } = useShow<IAccount>();

    const { data } = queryResult;
    const account = data?.data;

    return (
        <Drawer
            open
            onClose={() => list("accounts")}
            width={breakpoint.sm ? "736px" : "100%"}
        >
            <Flex
                vertical
                gap={32}
                style={{
                    padding: "32px",
                }}
            >
                <CardWithContent title={account?.name} />
            </Flex>
        </Drawer>
    );
};
