import { Radio, Select, Table } from 'antd'
import { Option } from 'antd/es/mentions';
import React, { useState } from 'react';
import './Style.css'
import searchImage from "../../assets/iconsSearch.svg";
import { parse, unparse } from 'papaparse';


function TransactionTable({transactions,addTransaction, fetchTransactions}) {
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
  });

  // function to export the data to csv file using papaparse
  function exportCsv(){
    // Specifying fields and data explicitly
    var csv = unparse({
      "fields": ["name", "amount", "date", "type", "tag"],
      "data" :transactions,
    });
    const blob = new Blob([csv], {type:"text/csv;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
  }
  function importFromCsv(event){
    event.preventDefault();
    try{
      parse(event.target.files[0], {
        header: true,
        complete: async function (results){
          for( const transaction of results.data){
            const newTransaction = {
              ...transaction, 
              amount : parseFloat(transaction.amount)
            };
            await addTransaction(newTransaction, true);
          }
        }
      });
      toast.success("All transactions added");
      fetchTransactions();
      event.target.files = null;
    }catch(e){
      toast.error("e.message")
    }
  }
  return (
    <>
      <div className="search-input">
        <img src={searchImage} />
        <input type="text" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
        <Select   
          className='select-input'
          value={typeFilter}
          onChange={(value) => setTypeFilter(value)}
          placeholder='Type'
          allowClear
        >
          <Option value="">All Filters</Option>
          <Option value="Income">Income</Option>
          <Option value="Expense">Expense</Option>
        </Select>
      </div>
      <div className="table-design">
        <h2>Transaction Table</h2>

        <Radio.Group
          className='radio-group'
          value={radioSort}
          onChange={(e) => setRadioSort(e.target.value)}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Date</Radio.Button>
          <Radio.Button value="amount">Amount</Radio.Button>
        </Radio.Group>
        <div className="button-group">
          <button className='btn' onClick={exportCsv}>Export To Csv</button>
          <label for="file-csv" className='btn btn-solid'>Import From Csv</label>
          <input type="file" 
            accept='.csv' 
            id='file-csv' 
            onChange={importFromCsv}
            required style={{display: 'none'}} 
          />
        </div>
      </div>
      <Table dataSource={sortedTransactions} columns={columns} />
    </>
  )
}

export default TransactionTable