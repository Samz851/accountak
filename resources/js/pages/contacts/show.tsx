import {
    useShow,
    IResourceComponentsProps,
    useNavigation,
    useBack,
} from "@refinedev/core";
import { Flex, Grid } from "antd";
import { IAccount, IContact } from "../../interfaces";
import {
    CardWithContent,
    CustomerInfoList,
    CustomerInfoSummary,
    CustomerOrderHistory,
    Drawer,
} from "../../components";
import { ContactView } from "./components/contactView";

export const ContactShow: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const back = useBack();
    const breakpoint = Grid.useBreakpoint();
    const { queryResult } = useShow<IContact>();

    const { data } = queryResult;
    const contact = data?.data;

    return (
        <Drawer
            open
            onClose={() => back()}
            width={breakpoint.sm ? "736px" : "100%"}
        >
            <ContactView contact={contact} />
        </Drawer>
    );
};