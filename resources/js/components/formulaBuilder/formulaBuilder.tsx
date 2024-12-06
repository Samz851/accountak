import { axiosInstance } from "@refinedev/simple-rest";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const validateFormula = async (formula) => {
    try {
        const response = await axiosInstance.post("/custom-calculation/calculate", {
            formula,
            data: { TotalIncome: 5000, TotalExpenses: 2000 },
        });
        alert(`Result: ${response.data.result}`);
    } catch (error) {
        alert("Invalid Formula");
    }
};

const saveFormula = async (name, formula) => {
    await axiosInstance.post("/custom-calculation/save", {
        name,
        formula,
        user_id: 1, // Replace with actual user ID
    });
    alert("Formula saved successfully!");
};


const FormulaBuilder = () => {
    const [formula, setFormula] = useState("");
    const fields = ["Total Income", "Total Expenses", "Account Balance"];

    const [, drop] = useDrop({
        accept: "field",
        drop: (item: any) => setFormula((prev) => `${prev} ${item.name}`),
    });

    const Field = ({ name }) => {
        const [, drag] = useDrag({
            type: "field",
            item: { name },
        });

        return (
            <div ref={drag} style={{ padding: "5px", border: "1px solid gray", margin: "5px" }}>
                {name}
            </div>
        );
    };

    return (
        <div>
            <h3>Formula Builder</h3>
            <div>
                <h4>Available Fields</h4>
                {fields.map((field, index) => (
                    <Field key={index} name={field} />
                ))}
            </div>
            <div ref={drop} style={{ border: "1px dashed gray", padding: "10px", minHeight: "50px" }}>
                <strong>Formula:</strong> {formula || "Drag fields here to build a formula"}
            </div>
            <button onClick={() => console.log("Formula:", formula)}>Save Formula</button>
        </div>
    );
};

export default FormulaBuilder;
