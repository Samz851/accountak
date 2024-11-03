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
import { useEffect, useState } from "react";
import { StatementEditor } from "../components/CKEditor/StatementEditor";

export const StatemenReporttShow: React.FC<IResourceComponentsProps> = () => {
    const { list } = useNavigation();
    const back = useBack();
    const breakpoint = Grid.useBreakpoint();
    const { query } = useShow<IStatement>();
    const [ content, setContent] = useState('');


    const { data } = query;
    // const company = data?.data;

    useEffect(()=>{
        console.log(query, data);

    },[query])
    return (
        <Drawer
            open
            onClose={() => back()}
            width={"100%"}
            style={{ padding: "50px" }}
        >
            <h1>{data?.data.title as any}</h1>
            <StatementEditor content={data?.data.content} setContent={setContent} />

            {/* <CompanyView company={company} /> */}
        </Drawer>
    );
};
