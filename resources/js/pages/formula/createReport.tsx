import FormulaBuilder from "@/components/formulaBuilder/formulaBuilder";
import FormulaInput from "@/components/formulaBuilder/formulaInput";
import { IFormula } from "@/interfaces";
import { Create, useForm } from "@refinedev/antd";
import { HttpError, useGo } from "@refinedev/core";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

// const Field = ({ name }) => {
//     const [, drag] = useDrag({
//         type: "field",
//         item: { name },
//     });

//     return (
//         <div ref={drag} style={{ padding: "10px", border: "1px solid gray", margin: "5px" }}>
//             {name}
//         </div>
//     );
// };

// const Canvas = ({ onDrop }) => {
//     const [, drop] = useDrop({
//         accept: "field",
//         drop: (item: any) => onDrop(item.name as any),
//     });

//     return (
//         <div ref={drop} style={{ border: "1px dashed gray", minHeight: "200px", padding: "10px" }}>
//             Drop Fields Here
//         </div>
//     );
// };
type FormValues = {
    name: string;
    formula: string;
}
export const CreateFormula = () => {
    const [formula, setFormula] = useState<string>('');

    const [fields, setFields] = useState<any[]>([]);
    const go = useGo();
    const { form, formProps, onFinish, formLoading, saveButtonProps } = useForm<IFormula, HttpError, FormValues
    >({
        action: "create",
        warnWhenUnsavedChanges: true,
        resource: "formula",
        redirect: false,
    });

    const handleDrop = (field) => {
        setFields((prev) => [...prev, field]);
    };

    useEffect(() => {
        console.log(formula);
        console.log(form.getFieldValue('formula'), form.getFieldsValue());
        form?.setFieldValue('formula', formula);
    },[formula])

    return (
        <Create saveButtonProps={saveButtonProps}>

        
        <Form
            {...formProps}
            layout="vertical"
            onFinish={async (values) => {
                try {
                    const data = await onFinish({
                        name: values.name,
                        formula: values.formula
                    });
                    close();
                    // go({
                    //     to:
                    //         searchParams.get("to") ??
                    //         getToPath({
                    //             action: "list",
                    //         }) ??
                    //         "",
                    //     query: {
                    //         to: undefined,
                    //     },
                    //     options: {
                    //         keepQuery: true,
                    //     },
                    //     type: "replace",
                    // });

                } catch (error) {
                    Promise.reject(error);
                }
            }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Title" />
                </Form.Item>
                <Form.Item
                    label="Formula"
                    name="formula"
                    rules={[{required: true}]}
                >
                {/* <FormulaBuilder formula={formula} setFormula={setFormula} /> */}
                <FormulaBuilder formula={formula} setFormula={setFormula} />

                </Form.Item>
            </Form>
            {/* <PageBuilderComponent 
                config={SampleConfig} 
                data={defaultData}
                // overrides={{
                //     header: Header
                // }}
                onPublish={(data) => console.log(data)} 
            >
            </PageBuilderComponent> */}
        </Create>
    );
};
