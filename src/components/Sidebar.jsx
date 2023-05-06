import React from "react";
import "./sidebar.css";
import { FcDatabase } from "react-icons/fc";
import { FcBrokenLink } from "react-icons/fc";
import { FcStart } from "react-icons/fc";


export const Sidebar = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside>
            <div className="description">
                {/*You can drag these nodes to the pane on the right.*/}
                Puede arrastrar estos nodos al panel de la derecha.
            </div>
            <div
                className="dndnode"
                onDragStart={event => onDragStart(event, "trigger")}
                draggable>
                <FcStart color="#0DCAF0" size="20px" />
                <span className="ms-1">Trigger</span>
            </div>
            <div
                className="dndnode"
                onDragStart={event => onDragStart(event, "buttons")}
                draggable>
                <FcDatabase color="#0DCAF0" size="20px" />
                <span className="ms-1">Buttons</span>
            </div>
            <div
                className="dndnode"
                onDragStart={event => onDragStart(event, "request")}
                draggable>
                <FcBrokenLink size="20px" />
                <span className="ms-1">Request</span>
            </div>
        </aside>
    );
};
