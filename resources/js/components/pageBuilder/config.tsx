import { Config, DropZone } from "@measured/puck";
import { Card } from "antd/lib";

type ComponentsProps = {
    HeadingBlock: {
        title: string;
    };
    CardBlock?: {
        title?: string;
        bordered?: {};
    }
};

type RootProps = {
    title: string;
    description: string;
}

export const EditorConfig: Config<ComponentsProps, RootProps> = {
    components: {
        HeadingBlock: {
            fields: {
                title: {
                  type: "text",
                }
            },
            render: ({title}) => (<h1>{title}</h1>)
        },
        CardBlock: {
            fields: {
                title: {
                    type: "text",
                },
                bordered: {
                    type: "radio",
                    options: [
                        { label: "Left", value: "left" },
                        { label: "Right", value: "right" },
                    ],
                }
            },
            defaultProps: {
                bordered: "left",
            },
            render: ({title, bordered}) => (
                <>
                <Card
                    title={title}
                    bordered={bordered === "right"}
                />
                    <DropZone zone="NewZone" />
                </>
                )
        }
    },
    root: {
        // fields: {
        //     title: {
        //         type: "text",
        //     },
        //     description: {
        //         type: "textarea",
        //     }
        // },
        defaultProps: {
            title: ''
        }
        // render: ({children, title, description}) => (
        //     <div>
        //         <h1>{title}</h1>
        //         <p>{description}</p>
        //         {children}
        //     </div>
        // )
    }
};

