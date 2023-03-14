import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import { createExpense, deleteItem, getAllMatchingItems } from "../helper";

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();

  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h2 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h2>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expense
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;

export const budgetLoader = async ({ params }) => {
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget doesn't exist");
  }
  return { budget, expenses };
};

export const budgetAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created`);
    } catch (err) {
      throw new Error("there was a problem creating your expense.");
    }
  }

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
