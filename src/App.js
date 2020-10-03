import React, { useState, useEffect } from "react";
import List from "./components/List";
import Alert from "./components/Alert";
import Form from "./components/Form";

import "./styles.css";
import { v4 as uuid } from "uuid";
/*const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 600 },
  { id: uuid(), charge: "credit card", amount: 1200 }
];
localStorage.getItem("expenses") !== null
localStorage.hasOwnProperty("expenses")
*/
const initialExpenses = localStorage.hasOwnProperty("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
export default function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "Item edited" });
      } else {
        const singleExpense = {
          id: uuid(),
          charge,
          amount
        };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "Item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({ type: "danger", text: "Error" });
    }
  };
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All Items deleted" });
  };
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "Item deleted" });
  };
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
    console.log(id);
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  return (
    <>
      {alert.show && <Alert text={alert.text} type={alert.type} />}

      <h1>Budget Calculator</h1>
      <main className="App">
        <Form
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <List
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h2>
        Total:{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h2>
    </>
  );
}
