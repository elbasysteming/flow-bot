import React from "react";

const requestMethods = [
    {
        slug: "get",
        method: "GET",
    },
    {
        slug: "post",
        method: "POST",
    },
    {
        slug: "put",
        method: "PUT",
    },
    {
        slug: "patch",
        method: "PATCH",
    },
    {
        slug: "delete",
        method: "DELETE",
    },
];

export default function UrlEditor({
    url,
    setUrl,
    reqMethod,
    setReqMethod,
    onInputSend,
}) {
    return (
        <>
            <form className="flex">
                <select
                    className="form-select form-control-sm w-25"
                    value={reqMethod}
                    onChange={e => setReqMethod(e.target.value)}>
                    {requestMethods.map(option => (
                        <option key={option.slug} value={option.method}>
                            {option.method}
                        </option>
                    ))}
                </select>
                <input
                    className="form-control form-control-sm w-75"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
                <button
                    className="btn btn-light"
                    type="button"
                    onClick={e => onInputSend(e)}>
                    Send
                </button>
            </form>
        </>
    );
}
