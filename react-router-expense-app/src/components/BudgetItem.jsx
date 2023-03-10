import React from "react";
import {
  calculateSpentByBudget,
  formartCurrency,
  formatPercentage,
} from "../helper";

const BudgetItem = ({ budget }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);
  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formartCurrency(amount)}</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formartCurrency(spent)} spent</small>
        <small>... remaining</small>
      </div>
    </div>
  );
};

export default BudgetItem;
