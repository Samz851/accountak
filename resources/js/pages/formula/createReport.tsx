import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const Field = ({ name }) => {
    const [, drag] = useDrag({
        type: "field",
        item: { name },
    });

    return (
        <div ref={drag} style={{ padding: "10px", border: "1px solid gray", margin: "5px" }}>
            {name}
        </div>
    );
};

const Canvas = ({ onDrop }) => {
    const [, drop] = useDrop({
        accept: "field",
        drop: (item: any) => onDrop(item.name as any),
    });

    return (
        <div ref={drop} style={{ border: "1px dashed gray", minHeight: "200px", padding: "10px" }}>
            Drop Fields Here
        </div>
    );
};

export const ReportBuilder = () => {
    const [fields, setFields] = useState<any[]>([]);

    const handleDrop = (field) => {
        setFields((prev) => [...prev, field]);
    };

    return (
        <div style={{ display: "flex" }}>
            <div>
                <h3>Field List</h3>
                <Field name="Account Name" />
                <Field name="Account Type" />
                <Field name="Account Balance" />
            </div>
            <div>
                <h3>Design Canvas</h3>
                <Canvas onDrop={handleDrop} />
                <ul>
                    {fields.map((field, index) => (
                        <li key={index}>{field}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
