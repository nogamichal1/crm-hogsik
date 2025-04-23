import React, { useState } from "react";
import UserModal from "./UserModal";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, deleteUser, updateProfile } from "firebase/auth";

const initialUsers = [
  {
    id: "1",
    name: "Michał",
    surname: "Noga",
    position: "CEO",
    email: "michal.noga@hogs.live",
    phone: "+48 887788977",
    roles: ["Super Administrator"]
  }
];

export default function UserList({ onBack }) {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const roles = [
    "Super Administrator",
    "Administrator",
    "Moderator",
    "Handlowiec APP",
    "Handlowiec Ferry",
    "Handlowiec Fuel",
    "Handlowiec TollBox",
    "Handlowiec Insurance"
  ];

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleSaveUser = async (data) => {
    const exists = users.find(
      u => (u.email === data.email || u.phone === data.phone) && (!selectedUser || selectedUser.email !== data.email)
    );
    if (exists) {
      alert("Użytkownik z takim e-mailem lub numerem telefonu już istnieje.");
      return;
    }

    if (!selectedUser) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const newUser = {
          id: userCredential.user.uid,
          ...data
        };
        setUsers(prev => [...prev, newUser]);
        setShowModal(false);
      } catch (error) {
        alert("Błąd tworzenia użytkownika: " + error.message);
      }
    } else {
      setUsers(prev =>
        prev.map(u => (u.email === selectedUser.email ? { ...u, ...data } : u))
      );
      setShowModal(false);
    }
  };

  const handleEditUser = user => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = () => {
    setUsers(prev => prev.filter(u => u.email !== deleteConfirm.email));
    setDeleteConfirm(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-blue-600">← Powrót</button>
        <button onClick={handleAddUser} className="bg-green-600 text-white px-4 py-2 rounded">Dodaj użytkownika</button>
      </div>
      <h1 className="text-xl font-bold mb-4">Lista użytkowników</h1>
      <table className="w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Imię i nazwisko</th>
            <th className="p-2">Stanowisko</th>
            <th className="p-2">E-mail</th>
            <th className="p-2">Telefon</th>
            <th className="p-2">Rola</th>
            <th className="p-2">Opcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{u.name} {u.surname}</td>
              <td className="p-2">{u.position}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.phone}</td>
              <td className="p-2">{u.roles.join(", ")}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleEditUser(u)} className="px-2 py-1 text-white bg-blue-600 rounded">Edytuj</button>
                <button onClick={() => setDeleteConfirm(u)} className="px-2 py-1 text-white bg-red-600 rounded">Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <UserModal
          isEdit={!!selectedUser}
          initialData={selectedUser}
          roles={roles}
          onSave={handleSaveUser}
          onClose={() => setShowModal(false)}
        />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center modal-bg z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4">Potwierdź usunięcie</h2>
            <p className="mb-4">
              Czy na pewno usunąć użytkownika <strong>{deleteConfirm.name} {deleteConfirm.surname}</strong>?<br />
              Email: {deleteConfirm.email}<br />
              Telefon: {deleteConfirm.phone}<br />
              Role: {deleteConfirm.roles.join(", ")}
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 bg-gray-200 rounded">Anuluj</button>
              <button onClick={handleDeleteUser} className="px-4 py-2 bg-red-600 text-white rounded">Usuń</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
