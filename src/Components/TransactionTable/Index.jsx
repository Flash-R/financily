import { Radio, Select, Table } from 'antd'
import { Option } from 'antd/es/mentions';
import React, { useState } from 'react'

function TransactionTable({transactions}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [radioSort, setRadioSort] = useState("");
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        }
      ];

  let filteredTransaction = transactions.filter(
  (item) => item.name.toLowerCase().includes(search.toLowerCase())
  && item.type.includes(typeFilter));
  // Activating the sorting by mount and date using the filtered transaction
  let sortedTransactions = filteredTransaction.sort(
    (a, b) => {
      if(radioSort === "date"){
        return new Date(b.date) - new Date(a.date);
      }
      if(radioSort === "amount"){
      return b.amount - a.amount;
      }
  })
  return (
    <>
      <input type="text" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
      <Select 
        className='select-input'
        value={typeFilter}
        onChange={(value) => setTypeFilter(value)}
        placeholder='Type'
        allowClear
      >
        <Option value="">All</Option>
        <Option value="Income">Income</Option>
        <Option value="Expense">Expense</Option>
      </Select>

      <Radio.Group
        className='radio-group'
        value={radioSort}
        onChange={(e) => setRadioSort(e.target.value)}
      >
      <Radio.Button value="">No Sort</Radio.Button>
      <Radio.Button value="date">Date</Radio.Button>
      <Radio.Button value="amount">Amount</Radio.Button>
      </Radio.Group>
      <Table dataSource={sortedTransactions} columns={columns} />
    </>
  )
}

export default TransactionTable