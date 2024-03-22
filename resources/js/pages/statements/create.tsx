import { useLocation, useSearchParams } from "react-router-dom";

import { useModalForm, useSelect } from "@refinedev/antd";
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
import "@measured/puck/puck.css";


export const StatementCreatePage = () => {
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const go = useGo();
    const t = useTranslate();
    const [ selectedCreditAccount, setSelectedCreditAccount ] = useState<number>(0);
    const [ selectedDebitAccount, setSelectedDebitAccount ] = useState<number>(0);

    const { formProps, modalProps, close, onFinish } = useModalForm<IStatement, HttpError
    >({
        action: "create",
        defaultVisible: true,
        resource: "statements",
        redirect: false,
    });

    type Components = {
        HeadingBlock: {
            title: string;
        };
    };

    const defaultData = {
        content: [],
        root: {},
    }

    const config: Config<Components> = {
        components: {
            HeadingBlock: {
                fields: {
                    title: {
                      type: "text",
                    }
                },
                render: ({title}) => (<h1>{title}</h1>)
            }
        },
    };

    return (
        <Puck config={config} data={defaultData} onPublish={(data) => console.log(data)} />
    );
};
