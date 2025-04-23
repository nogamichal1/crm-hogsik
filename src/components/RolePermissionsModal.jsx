import React, { useState, useEffect } from "react";

export default function RolePermissionsModal({ role, onClose, onSave }) {
  const [permissions, setPermissions] = useState({ ...role.permissions });

  useEffect(() => {
    if (permissions.addUsers || permissions.editUsers || permissions.deleteUsers) {
      setPermissions(prev => ({ ...prev, viewUsers: true }));
    }
  }, [permissions.addUsers, permissions.editUsers, permissions.deleteUsers]);

  const handleChange = (perm) => {
    if (role.name === "Super Administrator") return;
    if (perm === "viewUsers") {
      setPermissions(prev => ({ ...prev, [perm]: !prev[perm] }));
    } else {
      const newValue = !permissions[perm];
      const newPermissions = { ...permissions, [perm]: newValue };
      if (newValue) newPermissions.viewUsers = true;
      setPermissions(newPermissions);
    }
  };

  const handleSubmit = () => {
    onSave(role.name, permissions);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center modal-bg z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">Uprawnienia roli: {role.name}</h2>
        <div className="space-y-3">
          <h3 className="font-semibold">Użytkownicy</h3>
          <div className="space-y-1 ml-2">
            <label><input type="checkbox" checked={permissions.viewUsers} onChange={() => handleChange("viewUsers")} disabled={role.name === "Super Administrator"} /> Wyświetlanie</label><br />
            <label><input type="checkbox" checked={permissions.addUsers} onChange={() => handleChange("addUsers")} disabled={role.name === "Super Administrator"} /> Dodawanie</label><br />
            <label><input type="checkbox" checked={permissions.editUsers} onChange={() => handleChange("editUsers")} disabled={role.name === "Super Administrator"} /> Edycja</label><br />
            <label><input type="checkbox" checked={permissions.deleteUsers} onChange={() => handleChange("deleteUsers")} disabled={role.name === "Super Administrator"} /> Usuwanie</label>
          </div>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Anuluj</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Zapisz</button>
        </div>
      </div>
    </div>
  );
}
