import React, { useState } from "react";
import FerryOrderModal from "./FerryOrderModal";
import { filterOrders } from "../utils/filterOrders";

const headers = [
  "Klient", "NIP", "Numer rezerwacji", "NR AUTA", "Trasa",
  "Data zamówienia", "Planowana data przeprawy", "Godzina",
  "Operator", "Długość auta", "Gdzie zamawiamy", "Nasza cena",
  "Cena klienta", "Marża", "nr FV operatora", "Kwota na FV od Operatora",
  "Marża rzeczywista", "Data przeprawy", "Numer proformy",
  "Faktura sprzedaży", "Nr korekty", "Faktoring", "Uwagi", "Komentarz",
];


export default function FerryOrders() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSave = (data) => {
    if (editIndex !== null) {
      const updated = [...orders];
      updated[editIndex] = data;
      setOrders(updated);
      setEditIndex(null);
    } else {
      setOrders(prev => [...prev, data]);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setIsModalOpen(true);
  };

  const handleDelete = (idx) => {
    setOrders(prev => prev.filter((_, i) => i !== idx));
  };

  const filtered = filterOrders(orders, searchTerm);

  return (
    <div className="p-4 pt-0">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Szukaj..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-1 rounded"
        />
        <button
          onClick={() => { setEditIndex(null); setIsModalOpen(true); }}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >Dodaj</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-600 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {headers.map(h => (
                <th key={h} className="border px-2 py-1 whitespace-nowrap">{h}</th>
              ))}
              <th className="border px-2 py-1">Opcje</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, idx) => (
              <tr key={idx} className="border-t text-center">
                {headers.map((key,i) => (
                  <td key={i} className="border px-2 py-1 whitespace-nowrap">{order[key]}</td>
                ))}
                <td className="border px-2 py-1 whitespace-nowrap">
                  <button className="text-blue-500 mr-2" onClick={() => handleEdit(idx)}>Edycja</button>
                  <button className="text-red-500" onClick={() => handleDelete(idx)}>Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <FerryOrderModal
          onClose={() => { setIsModalOpen(false); setEditIndex(null); }}
          onSave={handleSave}
          initialData={editIndex !== null ? orders[editIndex] : null}
        />
      )}
    </div>
  );
}
