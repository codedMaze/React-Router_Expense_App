import { redirect } from "react-router-dom";
import { deleteItem } from "../helper";
import { getAllMatchingItems } from "./../helper";

export const deleteBudget = ({ params }) => {
  try {
    deleteItem({ key: "budgets", id: params.id });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((item) => {
      deleteItem({ key: "expenses", id: item.id });
    });

    toast.success("budget deleted successfully!");
  } catch (err) {
    throw new Error("There was a problem deleting your budget.");
  }

  return redirect("/");
};
