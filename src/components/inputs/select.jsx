import { Select } from 'antd';
import React from 'react';
const { Option } = Select;


const SelectComponent = ({ onChange, onSearch, options, defaultValue }) => (
    <Select
        showSearch
        placeholder="Select"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        className="w-full"
        defaultValue={defaultValue}
        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
    >
        {
            options.map((op) => {
                return <Option value={op.value}>{op.name}</Option>
            })
        }
    </Select>
);

export default SelectComponent;