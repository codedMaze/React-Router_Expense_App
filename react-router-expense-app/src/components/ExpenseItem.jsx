import React from "react";
import { formartCurrency, formatDateToLocaleString } from "../helper";

const ExpenseItem = ({ expense }) => {
  return (
    <>
      <td>{expense.name}</td>
      <td>{formartCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
    </>
  );
};

export default ExpenseItem;
