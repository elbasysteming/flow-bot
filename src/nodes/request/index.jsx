import React, { memo, useState } from "react";
import Request from "./Workspace/Request/RequestPanel";
import { Handle, Position } from "reactflow";
import Response from "./Workspace/Response/ResponsePanel";
import { FcBrokenLink } from "react-icons/fc";

function RequestNode() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <>
            <Handle type="target" position={Position.Left} />
            <div className="custom-node__header">
                <FcBrokenLink size="20px" />
                <span className="ms-1">Request</span>
            </div>
            <div className="custom-node__body">
                <Handle type="source" position="bottom"/>
                <Request setResponse={setResponse} setLoading={setLoading} />
                <Response response={response} loading={loading} />
            </div>

        </>
    );
}

export default memo(RequestNode);
