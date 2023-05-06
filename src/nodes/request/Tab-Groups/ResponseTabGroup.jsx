import React, { useState } from "react";

import { ThreeDots } from "react-loader-spinner";

import JsonEditorPane from "../Panes/Json/JsonEditorPane";
import ResponseHeaderPane from "../Panes/ResponseHeader/ResponseHeaderPane";

export default function ResponseTabGroup({ doc, setDoc, response, loading }) {
    const [key, setKey] = useState("response-body");

    const responseTabs = [
        {
            slug: "response-body",
            title: "Response Body",
        },
        {
            slug: "response-header",
            title: "Response Header",
        },
    ];
    return (
        <>
            <div className="mt-2 nav nav-tabs" id="nav-tab-2" role="tablist">
                {responseTabs.map(tab => (
                    <button
                        key={tab.slug}
                        className={
                            key === tab.slug ? "nav-link active" : "nav-link"
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

            <div>
                {loading ? (
                    <ThreeDots
                        height="30"
                        width="30"
                        color="gray"
                        visible={true}
                    />
                ) : (
                    <>
                        <div className="mt-3 tab-content" id="nav-tab-2Content">
                            {responseTabs.map(tab => (
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
                                    {tab.slug == "response-body" && (
                                        <JsonEditorPane
                                            paneValue={doc}
                                            setPaneValue={setDoc}
                                            isEditable={false}
                                        />
                                    )}
                                    {tab.slug == "response-header" && (
                                        <ResponseHeaderPane
                                            response={response}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
