import React from "react";
import { Input } from "antd";
import './styles.css'


const InputCommon = ({placeholder, defaultValue, type, onChange, className}) => {
    return (
        <>
            <Input className={className} defaultValue={defaultValue} placeholder={placeholder} type={type} onChange={onChange} />
        </>
    )
}

export default InputCommon