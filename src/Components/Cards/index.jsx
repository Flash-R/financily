import React from 'react'
import "./style.css"
import { Row, Card } from 'antd'
import Button from '../Button/index'

function Cards({showIncomeModal, showExpenseModal, hideIncomeModal, hideExpenseModal}) {
  return (
    <div>
        <Row className='cards-row'>
            <Card className='my-card' title={"Current Balance"}>
              <p className='my-card-p'>Ugx : 0</p>
              <Button text="Reset Current Balance" blue={true} />
            </Card>
            <Card className='my-card' title={"Current Income"}>
              <p className='my-card-p'>Ugx : 0</p>
              <Button text="Add Income" blue={true} onclick={showIncomeModal} />
            </Card>
            <Card className='my-card' title={"Current Expenses"}>
              <p className='my-card-p'>Ugx : 0</p>
              <Button text="Add Expense" blue={true} onclick={showExpenseModal} />
            </Card>
        </Row>
    </div>
  )
}

export default Cards