import React, { useState } from "react";

import "./Tab-Groups.css";

import KeyValuePane from "../Panes/KeyValue/KeyValuePane";
import JsonEditorPane from "../Panes/Json/JsonEditorPane";

export default function RequestTabGroup({
    queryParams,
    setQueryParams,
    headers,
    setHeaders,
    body,
    setBody,
}) {
    const [key, setKey] = useState("headers");

    const requestTabs = [
        {
            slug: "query-params",
            title: "Query Params",
            panel: KeyValuePane,
            paneValue: queryParams,
            setPaneValue: setQueryParams,
        },
        {
            slug: "headers",
            title: "Headers",
            panel: KeyValuePane,
            paneValue: headers,
            setPaneValue: setHeaders,
        },
        {
            slug: "body",
            title: "Body",
            panel: JsonEditorPane,
            paneValue: body,
            setPaneValue: setBody,
        },
    ];

    return (
        <>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {requestTabs.map(tab => (
                        <button
                            key={tab.slug}
                            className={
                                key === tab.slug
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            id={`${tab.slug}-tab}`}
                            data-bs-toggle="pill"
                            data-bs-target={`#${tab.slug}`}
                            type="button"
                            role="tab"
                            onClick={() => {
                                setKey(tab.slug);
                            }}
                            aria-controls={tab.slug}
                            aria-selected="true">
                            {tab.title}
                        </button>
                    ))}
                </div>
            </nav>

            <div className="tab-content" id="nav-tabContent">
                {requestTabs.map(tab => (
                    <div
                        key={tab.slug}
                        className={
                            key === tab.slug
                                ? "tab-pane fade show active"
                                : "tab-pane fade"
                        }
                        id={tab.slug}
                        role="tabpanel"
                        aria-labelledby={`${tab.slug}-tab}`}>
                        {tab.slug == "headers" && (
                            <KeyValuePane
                                paneValue={tab.paneValue}
                                setPaneValue={tab.setPaneValue}
                            />
                        )}
                        {tab.slug == "query-params" && (
                            <KeyValuePane
                                paneValue={tab.paneValue}
                                setPaneValue={tab.setPaneValue}
                            />
                        )}
                        {tab.slug == "body" && (
                            <JsonEditorPane
                                paneValue={tab.paneValue}
                                setPaneValue={tab.setPaneValue}
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
