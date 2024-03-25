import {
    useShow,
    IResourceComponentsProps,
    useNavigation,
    useBack,
    useTranslate,
} from "@refinedev/core";
import { Flex, Grid, Table } from "antd";
import { IAccount } from "../../interfaces";
import {
    CardWithContent,
    CustomerInfoList,
    CustomerInfoSummary,
    CustomerOrderHistory,
    Drawer,
} from "../../components";
import { List } from "@refinedev/antd";
import { ButtonSuccess } from "@/button";
import { RollbackOutlined } from "@ant-design/icons";
import { AccountInfoView } from "./components/accountInfoView";
import { AccountBalanceTable } from "./components/accountBalanceTable";

export const AccountShow: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const { Column, ColumnGroup } = Table;
    const breakpoint = Grid.useBreakpoint();
    const { queryResult } = useShow<IAccount>();
    const back = useBack();
    const t = useTranslate();

    const { data } = queryResult;
    const account = data?.data;

    // return (
    //     <Drawer
    //         open
    //         onClose={() => back()}
    //         width={breakpoint.sm ? "736px" : "100%"}
    //     >
    //         <Flex
    //             vertical
    //             gap={32}
    //             style={{
    //                 padding: "32px",
    //             }}
    //         >
    //             <CardWithContent title={account?.name} />
    //         </Flex>
    //     </Drawer>
    // );
    return (
        <List
            breadcrumb={false}
            headerButtons={(props) => [
                // // <ExportButton key={useId()} onClick={triggerExport} loading={isLoading} />,
                <ButtonSuccess
                    key="back"
                    icon={<RollbackOutlined/>}
                    onClick={() => back()}
                >
                    {t("buttons.return")}
                </ButtonSuccess>,
            ]}
        >
            <AccountInfoView account={account} />
            <AccountBalanceTable transactions={{debit: account?.debit_transactions, credit: account?.credit_transactions}} />
        </List>
    );
};
