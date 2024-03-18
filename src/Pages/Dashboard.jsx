import React, { useEffect, useState } from 'react'
import Cards from '../Components/Cards'
import { Modal } from 'antd';
import AddIncome from '../Components/Modal/AddIncome';
import AddExpense from '../Components/Modal/AddExpense';
import { toast } from 'react-toastify';
import { auth , db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc, collection, getDoc, getDocs, query } from 'firebase/firestore';
import moment from 'moment/moment';
import TransactionTable from '../Components/TransactionTable/Index';

function Dashboard() {
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  

  // use States for calculating balances
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

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

  const onFinish = (values,type) =>{
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tags: values.tags,
      name: values.name
    }

    addTransaction(newTransaction);
    console.log("On Finish", values, type)
  }

  async function addTransaction(transaction, many){
    try {
      const docRef = await addDoc(
        collection(db,`users/${user.uid}/transaction`),
        transaction
      );
      console.log("Transaction Added with Id", docRef.id, "With user ID", user.uid);
      if(!many) toast.success("Transaction added")

      
      // create a new arr to update the transactions use state
      let newArr = transactions;
      newArr.push(transaction)
      setTransactions(newArr);
      calculateBalance();

      
    } catch (error) {
      // console.log(error)
      if(!many)toast.error( error)
    }
  }

  useEffect(()=>{
    // get all docs in a firestore for a specific user
    fetchTransactions();
  },[])

  useEffect(()=>{
    calculateBalance();
  },[transactions])
  // Fetching all transactions from the firebase store
  async function fetchTransactions(){
    setLoading(true);
    if(user){
      try {
        const q = query(collection(db, `users/${user.uid}/transaction`));
        const querySnapshot = await getDocs(q);

        let transactionArray =[];

        querySnapshot.forEach((doc) =>{
          // console.log("Doc >>>>", doc.data);
          transactionArray.push(doc.data());
        });
        setTransactions(transactionArray);
        // console.log("Transactio Array", transactionArray);
        if(transactionArray.length > 0){
          toast.success("Transaction Fetched");

        }else{
          toast.error("No Transaction Found");
          // console.log("no transactio for user ", user.uid)
        }
      } catch (error) {
        toast.error(error);
        // console.log("error  >>>>>", error)
      }
    }
    setLoading(false);
  }

  function calculateBalance(){
    let income = 0;
    let expense = 0;

    transactions.forEach((transactionItem)=>{
      if(transactionItem.type === "Income"){
        income += transactionItem.amount;
      }else{
        expense += transactionItem.amount;
      }

      setIncome(income);
      setExpense(expense);
      setTotalBalance(income - expense);
    })

  }

  return (
    <>
      {loading ? <p>Loading ....</p>:
      <div>
        <Cards 
          income={income}
          expense={expense}
          totalBalance={totalBalance}
          showIncomeModal={showIncomeModal}
          showExpenseModal={showExpenseModal}
          hideIncomeModal={hideIncomeModal}
          hideExpenseModal={hideExpenseModal}
        />
        <AddIncome 
          isIncomeModalVisible={isIncomeModalVisible}
          hideIncomeModal={hideIncomeModal}
          onFinish={onFinish}
        />
        <AddExpense 
          isIncomeModalVisible={isExpenseModalVisible}
          hideIncomeModal={hideExpenseModal}
          onFinish={onFinish}
        />
        
        <TransactionTable 
          transactions={transactions}
          addTransaction={addTransaction}
          fetchTransactions={fetchTransactions} />
        {/* <Modal 
          visible={isIncomeModalVisible}
          onCancel={hideIncomeModal}
          footer={null}
        >Income</Modal>
        <Modal 
          visible={isExpenseModalVisible}
          onCancel={hideExpenseModal}
          footer={null}
        >Expense</Modal> */}
      </div>
    }
    </>
  )
}

export default Dashboard