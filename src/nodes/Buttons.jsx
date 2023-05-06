import React, { memo } from "react";
import { FcDatabase } from "react-icons/fc";
import { Handle, useReactFlow, useStoreApi, Position } from "reactflow";
import { v4 as uuidv4 } from "uuid";

function Buttons({ id, data }) {
    const { setNodes } = useReactFlow();
    const store = useStoreApi();
    const { nodeInternals } = store.getState();

    const onHandleClick = () => {
        const idData = uuidv4();
        setNodes(
            Array.from(nodeInternals.values()).map(node => {
                if (node.id === id) {
                    node.data = {
                        inputs: {
                            ...node.data.inputs,
                            [idData]: "Title Buttom",
                        },
                    };
                }
                return node;
            })
        );
    };

    const onHandleChange = event => {
        setNodes(
            Array.from(nodeInternals.values()).map(node => {
                if (node.id === id) {
                    node.data = {
                        inputs: {
                            ...node.data.inputs,
                            [event.target.id]: event.target.value,
                        },
                    };
                }
                return node;
            })
        );
    };

    return (
        <>
            <div className="custom-node__header">
                <FcDatabase size="20px" />
                <span className="ms-1">Botones</span>
            </div>
            <div className="custom-node__body">
                <Handle type="target" position={Position.Left} />
                {Object.keys(data.inputs).map(index => (
                    <div key={index} className="custom-node__select">
                        <input
                            value={data.inputs[index] ?? ""}
                            id={index}
                            onChange={onHandleChange}
                            type="text"
                            className="form-control form-control-sm"
                        />
                        <Handle type="source" position={Position.Right} />
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={onHandleClick}>
                    Agregar Botón
                </button>
            </div>
        </>
    );
}

export default memo(Buttons);
