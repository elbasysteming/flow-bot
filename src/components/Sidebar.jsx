import React from "react";
import { useSelector } from "react-redux";
import "./sidebar.css";
import { FcDatabase } from "react-icons/fc";
import { FcBrokenLink } from "react-icons/fc";
import { FcStart } from "react-icons/fc";

export const Sidebar = () => {
    const flow = useSelector(state => state.flow);

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    const onHandleSaveFlow = () => {
        console.log(flow);
    };

    return (
        <aside>
            <div className="d-grid gap-2 col-12 mx-auto mb-4">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onHandleSaveFlow}>
                    Guardar flujo
                </button>
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
            <div className="description">
                Puede arrastrar estos nodos al panel de la derecha.
            </div>
        </aside>
    );
};
