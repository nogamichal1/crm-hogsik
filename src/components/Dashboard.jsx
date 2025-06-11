
import React from "react";
import TopNav from "./TopNav";
import { Routes, Route, Navigate } from "react-router-dom";
import UserList from "./UserList";
import RoleList from "./RoleList";
import ContractorsList from "./ContractorsList";
import FerryOrders from "./FerryOrders";

export default function Dashboard() {
  return (
    <div className="flex">
      <TopNav />
      <div className="flex-1 p-4 pt-20 max-w-full overflow-x-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<h2>Witaj w HOGS CRM Dashboard</h2>} />
          <Route path="/users" element={<UserList />} />
          <Route path="/roles" element={<RoleList />} />
          <Route path="/contractors" element={<ContractorsList />} />
          <Route path="/ferry-orders" element={<FerryOrders />} />
        </Routes>
      </div>
    </div>
  );
}
