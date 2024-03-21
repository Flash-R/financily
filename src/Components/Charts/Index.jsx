import React from 'react'
import { Line, Pie } from '@ant-design/charts';

function ChartComponent({sortedTransactions}) {
    const data = sortedTransactions.map((item)=>{
      return {Date: item.date, Amount: item.amount}
    })

    const expenseData = sortedTransactions.filter((item)=>{
      if(item.type === "Expense"){
        return {tags :item.tags, amount: item.amount}
      }
    })

    // const exactExpenseData = expenseData.reduce((acc,item)=>{
    //   acc[item.tag] = item.amount;
    //   return acc;

    
      const config = {
        data,
        width: 900,
        xField: 'Date',
        yField: 'Amount',
      };
      const expenseConfig = {
        data: expenseData,
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