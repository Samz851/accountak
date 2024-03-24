import { useLocation, useSearchParams } from "react-router-dom";

import { useForm, Edit, useSelect, List, useThemedLayoutContext } from "@refinedev/antd";
import {
    CreateResponse,
    HttpError,
    useCreateMany,
    useGetToPath,
    useGo,
    useTranslate
} from "@refinedev/core";
// import { GetFields, GetVariables } from "@refinedev/nestjs-query";

import { useAccountTypesSelect } from "@/hooks/useAccountTypesSelect";
import { useAccountsSelect } from "@/hooks/useAccountsSelect";
import { useState, useEffect } from "react";
import { IStatement } from "@/interfaces";
import { Config, Puck } from "@measured/puck";
import "@/components/pageBuilder/puck.css";
import { Flex, Form } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import { useStyles } from "./styled";
import { EditorConfig } from "@/components";


export const StatementCreatePage = () => {
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const go = useGo();
    const t = useTranslate();
    const [ selectedCreditAccount, setSelectedCreditAccount ] = useState<number>(0);
    const [ selectedDebitAccount, setSelectedDebitAccount ] = useState<number>(0);
    const { styles } = useStyles();
    const { formProps, saveButtonProps, queryResult, onFinish } = useForm<IStatement, HttpError
    >({
        action: "create",
        warnWhenUnsavedChanges: true,
        resource: "statements",
        redirect: false,
    });
    const { form } = formProps;
    const statement = Form.useWatch('statement', form)
    const {
        mobileSiderOpen,
        setMobileSiderOpen,
        siderCollapsed,
        setSiderCollapsed,
    } = useThemedLayoutContext();

    // useEffect(() => {
    //     console.log(formProps);
    //     console.log(statement)
    // },[formProps, statement]);

    useEffect(() => {
        setMobileSiderOpen(false);
        setSiderCollapsed(true);
    },[]);

    const defaultData = {
        content: [],
        root: {},
    }

    const Header = ({ actions, children }) => {
        console.log('Header', actions, children);

        return (
            <>
                {actions}
                {children}
            </>
        )
    }

    return (
        <PageContainer
            className={styles.acPageContainer}
        >
            <Puck 
                config={EditorConfig} 
                data={defaultData}
                overrides={{
                    header: Header
                }}
                onPublish={(data) => console.log(data)} 
            />
        </PageContainer>

    );
};
