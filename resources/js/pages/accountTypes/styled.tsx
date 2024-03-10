import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => {
    return {
        treeNode: {
            ".ant-tree-switcher": {
                width: '32px',
                color: '#c7c7c7'
            },
            '.ant-tree-switcher .ant-tree-switcher-icon': {
                display: 'inline-block',
                fontSize: '20px',
                verticalAlign: 'baseline',
                width: '100%',
                lineHeight: '2rem'
            }
        }
    }
})
