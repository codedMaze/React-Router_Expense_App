import { redirect } from "react-router-dom";
import { deleteItem } from "../helper";

export const logoutAction = async () => {
  deleteItem({ key: "userName" });
  return redirect("");
};
