
import React, { useState } from "react";
import FerryOrderModal from "./FerryOrderModal";

const initialOrders = [];

const headers = [
  "Klient", "NIP", "Numer rezerwacji", "NR AUTA", "Trasa",
  "Data zamówienia", "Planowana data przeprawy", "Godzina",
  "Operator", "Długość auta", "Gdzie zamawiamy", "Nasza cena",
  "Cena klienta", "Marża", "nr FV operatora", "Kwota FV",
  "Marża rzeczywista", "Data przeprawy", "Numer proformy",
  "Faktura sprzedaży", "Nr korekty", "Faktoring", "Uwagi", "Komentarz"
];

const searchKeys = [
  "Klient", "NIP", "Numer rezerwacji", "NR AUTA", "nr FV operatora",
  "Numer proformy", "Faktura sprzedaży", "Nr korekty", "Uwagi", "Komentarz"
];

export default function FerryOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
const [filterOrderFrom, setFilterOrderFrom] = useState("");
const [filterOrderTo, setFilterOrderTo] = useState("");
const [filterCrossFrom, setFilterCrossFrom] = useState("");
const [filterCrossTo, setFilterCrossTo] = useState("");
const [useOrderDateFilter, setUseOrderDateFilter] = useState(false);
const [useCrossDateFilter, setUseCrossDateFilter] = useState(false);

  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [filterColumn, setFilterColumn] = useState("Data zamówienia");

  const handleAddOrder = (order) => {
    if (editIndex !== null) {
      const updated = [...orders];
      updated[editIndex] = order;
      setOrders(updated);
      setEditIndex(null);
    } else {
      setOrders([...orders, order]);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updated = [...orders];
    updated.splice(index, 1);
    setOrders(updated);
  };

  const handleSort = (key) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);
  };

  const filteredOrders = orders
    .filter((order) => {
  if (searchTerm.trim() === "") return true;
  return Object.entries(order).some(
    ([key, value]) =>
      searchKeys.includes(key) &&
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );
})
.filter((order) => {
  if (useOrderDateFilter && filterOrderFrom && filterOrderTo) {
    const val = order["FerryOrderOrderDate"];
    if (!(val >= filterOrderFrom && val <= filterOrderTo)) return false;
  }
  if (useCrossDateFilter && filterCrossFrom && filterCrossTo) {
    const val = order["FerryOrderRealCrossingDate"];
    if (!(val >= filterCrossFrom && val <= filterCrossTo)) return false;
  }
  return true;
})

    .filter((order) => {
  if (searchTerm.trim() === "") return true;
  return Object.entries(order).some(
    ([key, value]) =>
      searchKeys.includes(key) &&
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );
})
.filter((order) => {
  if (useOrderDateFilter && filterOrderFrom && filterOrderTo) {
    const val = order["FerryOrderOrderDate"];
    if (!(val >= filterOrderFrom && val <= filterOrderTo)) return false;
  }
  if (useCrossDateFilter && filterCrossFrom && filterCrossTo) {
    const val = order["FerryOrderRealCrossingDate"];
    if (!(val >= filterCrossFrom && val <= filterCrossTo)) return false;
  }
  return true;
})

    .sort((a, b) => {
      if (!sortKey) return 0;
      const aVal = a[sortKey] || "";
      const bVal = b[sortKey] || "";
      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });

  return (
    <div className="p-4 pt-0">
      <div className="flex justify-between items-center mb-2">
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <select
          value={filterColumn}
          onChange={(e) => setFilterColumn(e.target.value)}
          className="border p-1 rounded"
        >
          <option>Data zamówienia</option>
          <option>Data przeprawy</option>
        </select>
        <input
          type="date"
          value={filterFrom}
          onChange={(e) => setFilterFrom(e.target.value)}
          className="border p-1 rounded"
        />
        <input
          type="date"
          value={filterTo}
          onChange={(e) => setFilterTo(e.target.value)}
          className="border p-1 rounded"
        />
      </div>

      <div className="overflow-FerryOrderVehiclePlates">
        
<div className="flex gap-4 items-end mb-4 text-sm">
  <div>
    <label>Data zamówienia od:</label>
    <input type="date" value={filterOrderFrom} onChange={e => setFilterOrderFrom(e.target.value)} />
  </div>
  <div>
    <label>do:</label>
    <input type="date" value={filterOrderTo} onChange={e => setFilterOrderTo(e.target.value)} />
  </div>
  <div className="flex gap-2">
    <button onClick={() => setUseOrderDateFilter(true)} className="px-2 py-1 bg-green-600 text-white rounded">włącz</button>
    <button onClick={() => {setUseOrderDateFilter(false); setFilterOrderFrom(""); setFilterOrderTo("");}} className="px-2 py-1 bg-gray-500 text-white rounded">wyczyść</button>
  </div>
  <div className="ml-8">
    <label>Data przeprawy od:</label>
    <input type="date" value={filterCrossFrom} onChange={e => setFilterCrossFrom(e.target.value)} />
  </div>
  <div>
    <label>do:</label>
    <input type="date" value={filterCrossTo} onChange={e => setFilterCrossTo(e.target.value)} />
  </div>
  <div className="flex gap-2">
    <button onClick={() => setUseCrossDateFilter(true)} className="px-2 py-1 bg-green-600 text-white rounded">włącz</button>
    <button onClick={() => {setUseCrossDateFilter(false); setFilterCrossFrom(""); setFilterCrossTo("");}} className="px-2 py-1 bg-gray-500 text-white rounded">wyczyść</button>
  </div>
</div>

<table className="min-w-full border border-gray-300 dark:border-gray-600 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {headers.map((col) => (
                <th
                  key={col}
                  onClick={() => handleSort(col)}
                  className="border px-2 py-1 cursor-pointer text-gray-700 dark:text-gray-200 whitespace-nowrap"
                >
                  {col} {sortKey === col ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
              ))}
              <th className="border px-2 py-1 text-gray-700 dark:text-gray-200">Opcje</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, idx) => (
              <tr key={idx} className="border-t text-center">
                {headers.map((key, i) => (
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
      <div className="mt-4">
            setEditIndex(null);
            setIsModalOpen(true);
          }}
        >
        </button>
      </div>
      {isModalOpen && (
        <FerryOrderModal
          onClose={() => {
            setIsModalOpen(false);
            setEditIndex(null);
          }}
          onSave={handleAddOrder}
          initialData={editIndex !== null ? orders[editIndex] : null}
        />
      )}
    </div>
  );
}
