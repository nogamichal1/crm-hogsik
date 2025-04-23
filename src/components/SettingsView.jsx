import React, { useState } from "react";
import UserList from "./UserList";
import RoleList from "./RoleList";

export default function SettingsView({ onBack }) {
  const [view, setView] = useState(null);

  if (view === "users") return <UserList onBack={() => setView(null)} />;
  if (view === "roles") return <RoleList onBack={() => setView(null)} />;

  return (
    <div className="p-6">
      <button onClick={onBack} className="text-blue-600 mb-4">← Powrót</button>
      <h1 className="text-2xl font-bold mb-4">Ustawienia</h1>
      <div className="grid grid-cols-2 gap-4">
        <div
          className="bg-yellow-100 hover:bg-yellow-200 rounded shadow p-4 hover:bg-gray-50 cursor-pointer"
          onClick={() => setView("users")}
        >
          <h2 className="text-lg font-semibold">Użytkownicy</h2>
          <p>Zarządzaj użytkownikami i ich danymi</p>
        </div>
        <div
          className="bg-yellow-100 hover:bg-yellow-200 rounded shadow p-4 hover:bg-gray-50 cursor-pointer"
          onClick={() => setView("roles")}
        >
          <h2 className="text-lg font-semibold">Role</h2>
          <p>Zarządzaj rolami i uprawnieniami</p>
        </div>
      </div>
    </div>
  );
}
