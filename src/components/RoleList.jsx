import React, { useState } from "react";
import RolePermissionsModal from "./RolePermissionsModal";

const initialRoles = [
  {
    name: "Super Administrator",
    permissions: {
      viewUsers: true,
      addUsers: true,
      editUsers: true,
      deleteUsers: true
    },
    isDefault: true
  },
  {
    name: "Administrator",
    permissions: {
      viewUsers: true,
      addUsers: true,
      editUsers: true,
      deleteUsers: true
    },
    isDefault: false
  }
];

export default function RoleList({ onBack }) {
  const [roles, setRoles] = useState(initialRoles);
  const [editingRole, setEditingRole] = useState(null);

  const handlePermissionSave = (roleName, newPermissions) => {
    setRoles(prev =>
      prev.map(r => (r.name === roleName ? { ...r, permissions: newPermissions } : r))
    );
    setEditingRole(null);
  };

  const handleDelete = (roleName) => {
    if (roleName === "Super Administrator") return;
    setRoles(prev => prev.filter(r => r.name !== roleName));
  };

  const handleCreateRole = () => {
    const roleName = prompt("Podaj nazwę nowej roli:");
    if (!roleName) return;
    if (roles.find(r => r.name.toLowerCase() === roleName.toLowerCase())) {
      alert("Taka rola już istnieje.");
      return;
    }
    setRoles(prev => [...prev, {
      name: roleName,
      permissions: {
        viewUsers: false,
        addUsers: false,
        editUsers: false,
        deleteUsers: false
      },
      isDefault: false
    }]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-blue-600">← Powrót</button>
        <button onClick={handleCreateRole} className="bg-green-600 text-white px-4 py-2 rounded">Utwórz rolę</button>
      </div>
      <h1 className="text-xl font-bold mb-4">Lista ról</h1>
      <table className="w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Rola</th>
            <th className="p-2">Uprawnienia</th>
            <th className="p-2">Opcje</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((r, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{r.name}</td>
              <td className="p-2">
                {Object.entries(r.permissions).filter(([_, val]) => val).map(([key]) => key).join(", ")}
              </td>
              <td className="p-2 flex gap-2">
                <button onClick={() => setEditingRole(r)} className="px-2 py-1 text-white bg-blue-600 rounded">Zarządzaj uprawnieniami</button>
                {!r.isDefault && (
                  <button onClick={() => handleDelete(r.name)} className="px-2 py-1 text-white bg-red-600 rounded">Usuń</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingRole && (
        <RolePermissionsModal
          role={editingRole}
          onClose={() => setEditingRole(null)}
          onSave={handlePermissionSave}
        />
      )}
    </div>
  );
}
