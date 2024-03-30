import React from 'react'
import { Line, Pie } from '@ant-design/charts';

function ChartComponent({sortedTransactions}) {
    const data = sortedTransactions.map((item)=>{
      return {Date: item.date, Amount: item.amount}
    })

    const expenseData = sortedTransactions.filter((item)=>{
      if(item.type === "Expense"){
        return {tags:item.tags, amount: item.amount}
      }
    })
    console.log(expenseData)
    const exactExpenseData = expenseData.reduce((acc,obj)=>{
      let key = obj.tags;
      if(!acc[key]){
        acc[key] = {tags : obj.tags, amount: obj.amount}
      }else{
        acc[key].amount += obj.amount;
      }
      return acc;
    })
    console.log(exactExpenseData)

    
      const config = {
        data,
        width: 900,
        xField: 'Date',
        yField: 'Amount',
      };
      const expenseConfig = {
        data: Object.values(exactExpenseData),
        width: 400,
        angleField: 'amount',
        colorField: 'tags',
      };
      return (
        <div style={{display: 'flex',
          flexDirection: 'row', 
          width: '700px', 
          justifyContent: 'space-between'}}
        >
          <Line {...config} />
          <Pie {...expenseConfig} />
        </div>
      )
    }
export default ChartComponent