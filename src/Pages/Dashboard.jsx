import React, { useState } from 'react'
import Cards from '../Components/Cards'
import { Modal } from 'antd';

function Dashboard() {
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);

  function showIncomeModal() {
    setIsIncomeModalVisible(true);
  }
  function showExpenseModal() {
    setIsExpenseModalVisible(true);
  }
  function hideIncomeModal() {
    setIsIncomeModalVisible(false);
  }
  function hideExpenseModal() {
    setIsExpenseModalVisible(false);
  }
  return (
    <div>
      <Cards showIncomeModal={showIncomeModal}
        showExpenseModal={showExpenseModal}
        hideIncomeModal={hideIncomeModal}
        hideExpenseModal={hideExpenseModal}
      />
      <Modal 
        visible={isIncomeModalVisible}
        onCancel={hideIncomeModal}
        footer={null}
      >Income</Modal>
      <Modal 
        visible={isExpenseModalVisible}
        onCancel={hideExpenseModal}
        footer={null}
      >Expense</Modal>
    </div>
  )
}

export default Dashboard