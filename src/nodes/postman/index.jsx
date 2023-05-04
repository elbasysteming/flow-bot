import React, { memo, useState } from "react";
import Request from "./Workspace/Request/RequestPanel";
import Response from "./Workspace/Response/ResponsePanel";
import { FcBrokenLink } from "react-icons/fc";

function PostmanNode() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <>
            <div className="custom-node__header">
                <FcBrokenLink size="20px" />
                <span className="ms-1">Api</span>
            </div>
            <div className="custom-node__body">
                <Request setResponse={setResponse} setLoading={setLoading} />
                <Response response={response} loading={loading} />
            </div>
        </>
    );
}

export default memo(PostmanNode);
