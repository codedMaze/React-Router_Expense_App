import React from "react";
import { useLoaderData } from "react-router-dom";
import { fetchData } from "../helper";

const DashBoard = () => {
  const { userName } = useLoaderData();
  return (
    <div>
      <h1>{userName}</h1>
      DashBoard
    </div>
  );
};

export default DashBoard;

export const dashboardLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};
