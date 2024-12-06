import { useState } from "react";
import Editor from "@monaco-editor/react";

const FormulaEditor = ({ initialFormula = "", onSave }) => {
    const [formula, setFormula] = useState(initialFormula);

    const handleEditorChange = (value) => {
        setFormula(value || "");
    };

    const saveFormula = () => {
        onSave(formula);
    };

    return (
        <div>
            <h3>Formula Editor</h3>
            <Editor
                height="200px"
                language="formula-language"
                value={formula}
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: false },
                    lineNumbers: "off",
                    scrollBeyondLastLine: false,
                }}
            />
            <button onClick={saveFormula}>Save Formula</button>
        </div>
    );
};

export default FormulaEditor;
