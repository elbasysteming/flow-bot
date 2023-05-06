import React, { useCallback, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useStoreApi,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
} from "reactflow";

import {
    nodes as initialNodes,
    edges as initialEdges,
} from "./initial-elements";

//nodes
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

    const onConnect = useCallback(
        params => setEdges(eds => addEdge(params, eds)),
        []
    );



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

            console.log(reactFlowInstance.getNodes());

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
