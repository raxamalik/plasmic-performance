import React from "react";

function CustomInput({
    value,
    onChange,
    type,
    placeholder,
    required = true
}: {
    value: any;
    onChange: (arg0: any) => void;
    type: string;
    placeholder: string;
    required?: boolean
}) {

    return (
        <input
            className="proxy-input"
            type={type}
            onChange={(e) => { e.target.value === '' ? onChange(0) : onChange(parseFloat(e.target.value)) }}
            value={value === 0 || isNaN(value) ? "" : value}
            placeholder={placeholder}
            required={required}

        />
    );
}

export default CustomInput;
