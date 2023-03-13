export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));

const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };

  // check if exsiting budget
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

export const createExpense = ({ name, budgetId, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };

  // check if exsiting expense
  const existingExpense = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpense, newItem])
  );
};

export const deleteItem = ({ key }) => {
  localStorage.removeItem(key);
};

// Formart Currency
export const formartCurrency = (currency) => {
  return currency.toLocaleString(undefined, {
    style: "currency",
    currency: "NGN",
  });
};

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];

  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;

    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// formating percentages
export const formatPercentage = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatDateToLocaleString = (value) => {
  return new Date(value).toLocaleDateString();
};
