import { axiosInstance } from "@refinedev/simple-rest";
import { Input } from "antd";
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


const FormulaBuilder = ({formula, setFormula}) => {
    // const [formula, setFormula] = useState("");
    const fields = ["Total Income", "Total Expenses", "Account Balance"];

    // const [, drop] = useDrop({
    //     accept: "field",
    //     drop: (item: any) => setFormula((prev) => `${prev} ${item.name}`),
    // });

    // const Field = ({ name }) => {
    //     const [, drag] = useDrag({
    //         type: "field",
    //         item: { name },
    //     });

    //     return (
    //         <div ref={drag} style={{ padding: "5px", border: "1px solid gray", margin: "5px" }}>
    //             {name}
    //         </div>
    //     );
    // };

    return (
        <div>
            <p>Enter your formula using predefined variables like .</p>
            <Input.TextArea
                rows={4}
                value={formula}
                onChange={e => setFormula(e.target.value)}
                placeholder="Example: SUM({x}, {y})"
            />
        </div>
    );
};

export default FormulaBuilder;
