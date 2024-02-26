import {
    useShow,
    IResourceComponentsProps,
    useNavigation,
} from "@refinedev/core";
import { Flex, Grid } from "antd";
import { ICompany, IContact } from "@/interfaces";
import {
    CardWithContent,
    CustomerInfoList,
    CustomerInfoSummary,
    CustomerOrderHistory,
    Drawer,
} from "@/components";

export const CompanyShow: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const breakpoint = Grid.useBreakpoint();
    const { queryResult } = useShow<ICompany>();

    const { data } = queryResult;
    const company = data?.data;

    return (
        <Drawer
            open
            onClose={() => list("companies")}
            width={breakpoint.sm ? "736px" : "100%"}
        >
            <Flex
                vertical
                gap={32}
                style={{
                    padding: "32px",
                }}
            >
                <CardWithContent title={company?.company_name} />
                <CardWithContent title={company?.address} />
                {
                    company?.contacts?.map(contact => (
                        <CardWithContent title={contact?.name} />
                    ))
                }
            </Flex>
        </Drawer>
    );
};
