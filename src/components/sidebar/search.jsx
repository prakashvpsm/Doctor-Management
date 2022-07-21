import React from 'react'
import { Input, Space } from 'antd';
const { Search  }  = Input;


export default function SearchElement() {
    const onSearch = (value) => console.log(value);

    return (
        <div>
            <Search placeholder="input search text" onSearch={onSearch} enterButton />

        </div>
    )
}
