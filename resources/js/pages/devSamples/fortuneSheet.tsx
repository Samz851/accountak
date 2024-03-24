import { PageContainer } from "@ant-design/pro-layout";
import { Workbook } from "@fortune-sheet/react";
import { Sheet } from "@fortune-sheet/core";
import "@fortune-sheet/react/dist/index.css"
import { useStyles } from "./styled";
import { Flex } from "antd";
import Spreadsheet, { CellBase, Matrix } from "react-spreadsheet";
import { useState } from "react";

export const FortuneSheetComponent = () => {

    const { styles } = useStyles();
    return (
        // <PageContainer className={styles.acPageContainer}>
        <div style={{height: "700px"}}>
            <Workbook 
                data={[{name: "First Sheet"}]}
                onChange={(data: Sheet[]) => console.log(data)}
            />

        </div>
        // </PageContainer>
    )
}

export const FortuneBSheetComponent = () => {

    const { styles } = useStyles();
    const [sheetdata, setSheetData] = useState<Matrix<CellBase<any>>>([
        [{ value: "Vanilla" }, { value: "Chocolate" }, { value: "" }],
        [{ value: "Strawberry" }, { value: "Cookies" }, { value: "" }],
      ]);
    return (
        // <PageContainer className={styles.acPageContainer}>
        <div style={{height: "700px"}}>
            <Spreadsheet 
                data={sheetdata}
                onChange={(data) => console.log(data)}
            />

        </div>
        // </PageContainer>
    )
}