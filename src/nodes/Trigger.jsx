import React, { memo, useState } from "react";
import { FcStart } from "react-icons/fc";
import { Handle, useReactFlow, useStoreApi, Position } from "reactflow";
import { v4 as uuidv4 } from "uuid";

const Trigger = ({ id, data }) => {
    const { setNodes } = useReactFlow();
    const store = useStoreApi();
    const { nodeInternals } = store.getState();

    const [tags, setTags] = useState([]);

    function handleKeyDown(e) {
        if (e.key !== "Enter") return;
        const value = e.target.value;
        if (!value.trim()) return;
        setTags([...tags, value]);
        e.target.value = "";
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index));
    }

    const onHandleClick = () => {
        const idData = uuidv4();
        setNodes(
            Array.from(nodeInternals.values()).map(node => {
                if (node.id === id) {
                    node.data = {
                        inputs: {
                            ...node.data.inputs,
                            [idData]: "Message...",
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
                <FcStart color="#0DCAF0" size="20px" />
                <span className="ms-1">Trigger</span>
            </div>
            <div className="custom-node__body">
                <div className="tags-input-container">
                    <input
                        onKeyDown={handleKeyDown}
                        type="text"
                        className="tags-input "
                        placeholder="Ingrese palabaras disparadoras"
                    />
                    {tags.map((tag, index) => (
                        <div className="tag-item" key={index}>
                            <span className="text">{tag}</span>
                            <span
                                className="close"
                                onClick={() => removeTag(index)}>
                                &times;
                            </span>
                        </div>
                    ))}
                </div>

                {Object.keys(data.inputs).map(index => (
                    <div key={index} className="custom-node__select">
                        <input
                            value={data.inputs[index] ?? ""}
                            id={index}
                            onChange={onHandleChange}
                            type="text"
                            className="mt-2 form-control form-control-sm"
                        />
                        <Handle type="source" position={Position.Right} />
                    </div>
                ))}
                <button
                    type="button"
                    className="mt-2 btn btn-light"
                    onClick={onHandleClick}>
                    Agregar Mensaje
                </button>
            </div>
        </>
    );
};

export default memo(Trigger);
