import { useLocation, useOutletContext, useSearchParams } from "react-router-dom";

import { useForm, useModalForm } from "@refinedev/antd";
import {
    HttpError, useBack, useGetToPath,
    useGo,
    useList,
    useTranslate
} from "@refinedev/core";
// import { GetFields, GetVariables } from "@refinedev/nestjs-query";

import {
    LeftOutlined
} from "@ant-design/icons";
import {
    Form,
    Input,
    Modal, TreeSelect
} from "antd";

import { CreateContextType, CreateFormPropsType, IAccountsBranch } from "@/interfaces";

import { useEffect, useState } from "react";

type Props = {
    isOverModal?: boolean;
};

type FormValues = {
    name: string;
    description: string;
    parent?: any;
};
// type AccountsBranchesTree = IAccountsBranch & DataNode;
export const AccountsBranchCreateForm = () => {
    const { key } = useLocation();
    const getToPath = useGetToPath();
    const [searchParams] = useSearchParams();
    const go = useGo();
    const back = useBack();
    const [ createForms, goToCreateForm ] = useOutletContext<CreateContextType>();

    const [typeValue, setTypeValue] = useState<string>();

    const t = useTranslate();

    const initValues = {parent: searchParams.get('parent') ?? ''};

    const { formProps, form, formLoading, onFinish } = useForm<IAccountsBranch, HttpError, FormValues
    >({
        action: "create",
        resource: "branches",
    });

    const { data } = useList<IAccountsBranch>({
        resource: "branches",
        filters: [
            {
                field: 'selectOptions',
                operator: 'eq',
                value: true
            }
        ]
    });

    const accountBranches = data?.data ?? [];

    useEffect(() => {
        const prevForm = createForms.find( (form) => form.key === key );
        if ( prevForm ) {
            form.setFieldsValue( prevForm.values || {});
        }
    }, []);

    return (
        // <Modal
        //     {...modalProps}
        //     mask={!isOverModal}
        //     onCancel={() => {
        //         close();
        //         go({
        //             to:
        //                 searchParams.get("to") ??
        //                 getToPath({
        //                     action: "list",
        //                 }) ??
        //                 "",
        //             query: {
        //                 to: undefined,
        //             },
        //             options: {
        //                 keepQuery: true,
        //             },
        //             type: "replace",
        //         });
        //     }}
        //     title={t("accounts_branches.form.add")}
        //     width={512}
        //     closeIcon={<LeftOutlined />}
        // >
            <Form
                {...formProps}
                form={form}
                layout="vertical"
                onFinish={async (values) => {
                    try {
                        const data = await onFinish({
                            name: values.name,
                            description: values.description,
                            parent: values.parent
                        });
                        back();

                        
                    } catch (error) {
                        Promise.reject(error);
                    }
                }}
                initialValues={initValues}
            >
                <Form.Item
                    label={t("accounts_branches.fields.name")}
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("accounts_branches.fields.description")}
                    name="description"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("accounts_branches.fields.parent")}
                    name="parent"
                    // rules={[{ required: true }]}
                >
                    <TreeSelect
                        style={{ width: '100%' }}
                        // value={typeValue}
                        fieldNames={{label: "title", "value": "key", children: "children"}}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={accountBranches}
                        placeholder="Please select"
                        treeDefaultExpandAll
                        // onChange={onChangeType}
                        allowClear={true}
                        disabled={accountBranches.length === 0}
                        // defaultValue={initValue}
                        />

                </Form.Item>
                
            </Form>
        // </Modal>
    );
};
