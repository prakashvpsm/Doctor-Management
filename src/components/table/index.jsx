import { Button, Table } from 'antd';
import { useState } from 'react';



const Tables = ({columns, loading, data}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const create = () => {
    
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} loading={loading} />
    </div>
  );
};

export default Tables;