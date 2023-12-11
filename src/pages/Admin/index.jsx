import * as React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { MAppBar } from "./AppBar";

export const Admin = () => {
  return (
    <>
      <MAppBar />
      
      <Outlet />
    </>
  );
};
