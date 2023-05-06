import React, { useEffect, useState } from "react";

export default function KeyValueEditor({
    keyPair,
    setKeyPair,
    onKeyPairRemove,
}) {
    const [keyValue, setKeyValue] = useState(keyPair);
    const [debouncedKeyValue, setDebouncedKeyValue] = useState(keyValue);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedKeyValue(keyValue);
        }, 1000);
        return () => {
            clearTimeout(timerId);
        };
    }, [keyValue]);

    useEffect(() => {
        setKeyPair(debouncedKeyValue);
        // eslint-disable-next-line
    }, [debouncedKeyValue]);

    const handleOnChange = e => {
        setKeyValue(prevState => ({
            ...prevState,
            id: keyValue.id,
            [e.target.name]: e.target.value,
        }));
    };
    return (
        <>
            <div className="flex mt-2">
                <input
                    className="form-control form-control-sm w-25"
                    placeholder="Key"
                    name="keyItem"
                    onChange={e => handleOnChange(e)}
                />
                <input
                    className="form-control form-control-sm w-50"
                    placeholder="Value"
                    name="valueItem"
                    onChange={e => handleOnChange(e)}
                />
                <button
                    className="btn btn-light w-25"
                    onClick={() => onKeyPairRemove(keyPair)}>
                    Remove
                </button>
            </div>
        </>
    );
}
