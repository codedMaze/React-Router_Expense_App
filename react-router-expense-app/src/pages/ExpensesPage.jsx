import React from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../components/Table";
import { deleteItem, fetchData } from "../helper";

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>{expenses.length}</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;

export const expensesLoader = () => {
  const expenses = fetchData("expenses");
  return { expenses };
};

export const expensesAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success(`Expense deleted!`);
    } catch (err) {
      throw new Error("there was a problem deleting your expense.");
    }
  }
};
