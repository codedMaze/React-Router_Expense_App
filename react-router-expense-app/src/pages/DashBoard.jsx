import React from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Intro from "../components/Intro";
import { fetchData } from "../helper";

const DashBoard = () => {
  const { userName } = useLoaderData();
  return <>{userName ? <p>{userName}</p> : <Intro />}</>;
};

export default DashBoard;

export const dashboardAction = async ({ request }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    localStorage.setItem("userName", JSON.stringify(formData.userName));
    return toast.success(`Welcom ${formData.userName}`);
  } catch (err) {
    throw new Error("there was a problem creating your account");
  }
};

export const dashboardLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};
