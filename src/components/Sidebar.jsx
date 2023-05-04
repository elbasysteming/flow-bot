import React from "react";
import "./sidebar.css";
import { FcDatabase } from "react-icons/fc";

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
                onDragStart={event => onDragStart(event, "buttons")}
                draggable>
                <FcDatabase color="#0DCAF0" size="20px" />
                <span className="ms-1">Botones</span>
            </div>
            <div
                className="dndnode"
                onDragStart={event => onDragStart(event, "default")}
                draggable>
                Default Node
            </div>
            <div
                className="dndnode"
                onDragStart={event => onDragStart(event, "output")}
                draggable>
                Output Node
            </div>
        </aside>
    );
};
