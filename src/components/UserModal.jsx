import React, { useState, useEffect } from "react";

export default function UserModal({ onClose, onSave, roles = [], initialData = {}, isEdit = false }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    position: "",
    email: "",
    phonePrefix: "+48",
    phoneNumber: "",
    roles: [],
    password: "",
    ...initialData
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = e => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, roles: options }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.surname || !formData.email || !formData.phonePrefix || !formData.phoneNumber || !formData.position || !formData.roles.length || (!isEdit && !formData.password)) {
      alert("Wszystkie pola muszą być wypełnione");
      return;
    }
    const phone = formData.phonePrefix + formData.phoneNumber;
    onSave({ ...formData, phone });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center modal-bg z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">{isEdit ? "Edytuj użytkownika" : "Dodaj użytkownika"}</h2>
        <div className="space-y-3">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Imię" className="w-full p-2 border rounded" />
          <input name="surname" value={formData.surname} onChange={handleChange} placeholder="Nazwisko" className="w-full p-2 border rounded" />
          <input name="position" value={formData.position} onChange={handleChange} placeholder="Stanowisko" className="w-full p-2 border rounded" />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="E-mail" className="w-full p-2 border rounded" />
          <div className="flex gap-2">
            <input name="phonePrefix" value={formData.phonePrefix} onChange={handleChange} placeholder="Kierunkowy" className="w-[30%] p-2 border rounded" />
            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Numer telefonu" className="w-[70%] p-2 border rounded" />
          </div>
          <select name="roles" multiple value={formData.roles} onChange={handleRoleChange} className="w-full p-2 border rounded h-24">
            {roles.map((role, idx) => (
              <option key={idx} value={role}>{role}</option>
            ))}
          </select>
          {!isEdit && (
            <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Hasło" className="w-full p-2 border rounded" />
          )}
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Anuluj</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">{isEdit ? "Zapisz" : "Dodaj"}</button>
        </div>
      </div>
    </div>
  );
}
