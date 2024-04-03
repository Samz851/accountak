import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
    wrapper: {
        backgroundColor: "white",
        borderRadius: "0px",
        boxShadow:  "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff",
        padding: "24px",

        ".ant-list-header": {
            // display: "flex",
            // justifyContent: "flex-end",
            // alignItems: "center"
        }
    },

    errorBorder: {
        border: "1px solid red",
        borderRadius: "5px"
    }
}))