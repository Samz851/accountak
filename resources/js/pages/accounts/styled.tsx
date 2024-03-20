import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => {
    return {
        expanded: {
            ".expanded_row_odd": {
                backgroundColor: "#9c9898"
            },
            ".expanded_row_even": {
                backgroundColor: "#ababab"
            }
        }
    }
})
