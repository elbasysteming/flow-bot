import React, { useState, useEffect } from "react";
import prettyBytes from "pretty-bytes";

import ResponseTabGroup from "../../Tab-Groups/ResponseTabGroup";

export default function Response({ response, loading }) {
    const [doc, setDoc] = useState("{}");

    useEffect(() => {
        if (response === null) return;
        const jsonResponse = JSON.stringify(response.data, null, 2);
        setDoc(jsonResponse);
    }, [response, loading]);

    const hasResponse = !(response == null);

    let time = "";
    let status = "";
    let size = "";

    if (hasResponse) {
        const hasCustomData = "customData" in response;
        const hasData = "data" in response;
        const hasHeaders = "headers" in response;

        status = hasResponse ? response.status : 0;

        if (hasData && hasHeaders) {
            size = prettyBytes(
                (hasResponse ? JSON.stringify(response.data).length : 0) +
                    (hasResponse ? JSON.stringify(response.headers).length : 0)
            );
        }

        if (hasCustomData) {
            time = response.customData.time;
        }
    }
    const RenderedResponseMeta = () => {
        return (
            <div className="flex mt-3">
                <p className="w-25 bold">Response: </p>
                <span className="w-25">Status: {status}</span>
                <span className="w-25">Time: {time || '0.012s'}</span>
                <span className="w-25">Size: {size}</span>
            </div>
        );
    };

    return (
        <div>
            {response ? <RenderedResponseMeta /> : null}
            <ResponseTabGroup
                doc={doc}
                setDoc={setDoc}
                response={response}
                loading={loading}
            />
        </div>
    );
}
