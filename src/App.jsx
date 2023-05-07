import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateFlow /*, resetFlow */ } from "./features/flow/flowSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
} from "reactflow";
import {
    nodes as initialNodes,
    edges as initialEdges,
} from "./initial-elements";
import Buttons from "./nodes/Buttons";
import RequestNode from "./nodes/request/index";
import Trigger from "./nodes/Trigger";
import "reactflow/dist/style.css";
import "./overview.css";
import { Sidebar } from "./components/Sidebar";

const nodeTypes = {
    buttons: Buttons,
    trigger: Trigger,
    request: RequestNode,
};

const minimapStyle = {
    height: 120,
};

const App = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    let id = 0;
    const getId = () => `dndnode_${id++}`;
    const dispatch = useDispatch();

    const onConnect = useCallback(
        params => setEdges(eds => addEdge(params, eds)),
        []
    );
    useEffect(() => {
        dispatch(updateFlow({ nodes: [], edges: [] }));
    }, []);

    useEffect(() => {
        if (reactFlowInstance) {
            dispatch(
                updateFlow({
                    nodes: reactFlowInstance.getNodes(),
                    edges: reactFlowInstance.getEdges(),
                })
            );
            /*console.log("Nodos", reactFlowInstance.getNodes());
            console.log("Conexiones", reactFlowInstance.getEdges());*/
        }
    }, [nodes, edges]);

    const edgesWithUpdatedTypes = edges.map(edge => {
        if (edge.sourceHandle) {
            const edgeType = nodes.find(node => node.type === "buttons").data
                .inputs[edge.sourceHandle];
            edge.type = edgeType;
        }
        return edge;
    });

    const onDragOver = useCallback(event => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        event => {
            event.preventDefault();
            const reactFlowBounds =
                reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");

            // check if the dropped element is valid
            if (typeof type === "undefined" || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const newNode = {
                ...nodes,
                id: getId(),
                type,
                position,
                data: {
                    inputs: {
                        123: "Title Button",
                    },
                },
            };

            setNodes(nds => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    return (
        <div className="dndflow">
            <Sidebar />
            <ReactFlowProvider>
                <div
                    className="reactflow-wrapper"
                    ref={reactFlowWrapper}
                    style={{ width: "100vw", height: "100vh" }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edgesWithUpdatedTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        minZoom={0.5}
                        maxZoom={1.1}
                        fitView
                        attributionPosition="top-right"
                        nodeTypes={nodeTypes}>
                        <MiniMap style={minimapStyle} zoomable pannable />
                        <Controls />
                        <Background color="#EBEDF0" gap={16} />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
};

export default App;
