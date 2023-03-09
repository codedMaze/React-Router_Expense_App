import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../helper";

import wave from "../assets/wave.svg";
import Navbar from "../components/Navbar";

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Navbar userName={userName} />
      <Outlet />
      <img src={wave} alt="" />
    </div>
  );
};

export default Main;

export const mainLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};
