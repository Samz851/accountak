import { useTranslate, useUpdate } from "@refinedev/core";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Dropdown, Menu, MenuProps } from "antd";
import { TableActionButton } from "../../tableActionButton";
import { IOrder } from "../../../interfaces";

type OrderActionProps = {
    record: IOrder;
};

const menuItems: MenuProps["items"] = ["accept", "reject"]
    .map((action: string) => ({
        key: action,
        style: {
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
        },
        icon:
            <CheckCircleOutlined
                style={{
                    color: "#52c41a",
                    fontSize: 17,
                    fontWeight: 500,
                }}
            />,
        onClick: () => {},
        label: action


    }))
export const OrderActions: React.FC<OrderActionProps> = ({ record }) => {
    const t = useTranslate();
    const { mutate } = useUpdate();

    // const moreMenu = (record: IOrder) => (
    //     <Menu
    //         mode="vertical"
    //         onClick={({ domEvent }) => domEvent.stopPropagation()}
    //         items={menuItems}
    //     >
    //         {/* <Menu.Item
    //             key="accept"
    //             style={{
    //                 fontSize: 15,
    //                 display: "flex",
    //                 alignItems: "center",
    //                 fontWeight: 500,
    //             }}
    //             disabled={record.status.text !== "Pending"}
    //             icon={
    //                 <CheckCircleOutlined
    //                     style={{
    //                         color: "#52c41a",
    //                         fontSize: 17,
    //                         fontWeight: 500,
    //                     }}
    //                 />
    //             }
    //             onClick={() => {
    //                 mutate({
    //                     resource: "orders",
    //                     id: record.id,
    //                     values: {
    //                         status: {
    //                             id: 2,
    //                             text: "Ready",
    //                         },
    //                     },
    //                 });
    //             }}
    //         >
    //             {t("buttons.accept")}
    //         </Menu.Item>
    //         <Menu.Item
    //             key="reject"
    //             style={{
    //                 fontSize: 15,
    //                 display: "flex",
    //                 alignItems: "center",
    //                 fontWeight: 500,
    //             }}
    //             icon={
    //                 <CloseCircleOutlined
    //                     style={{
    //                         color: "#EE2A1E",
    //                         fontSize: 17,
    //                     }}
    //                 />
    //             }
    //             disabled={
    //                 record.status.text === "Delivered" ||
    //                 record.status.text === "Cancelled"
    //             }
    //             onClick={() =>
    //                 mutate({
    //                     resource: "orders",
    //                     id: record.id,
    //                     values: {
    //                         status: {
    //                             id: 5,
    //                             text: "Cancelled",
    //                         },
    //                     },
    //                 })
    //             }
    //         >
    //             {t("buttons.reject")}
    //         </Menu.Item> */}
    //     </Menu>
    // );
    return (
        <Dropdown menu={{items: menuItems}} trigger={["click"]}>
            <TableActionButton />
        </Dropdown>
    );
};
