import React, { useState } from "react";

function generateContractors(count = 200) {
  const countries = ["Polska", "Niemcy", "Francja", "Hiszpania", "Włochy", "Czechy"];
  const names = ["Transport", "Logistic", "Express", "Spedition", "Group", "Freight", "Auto", "Fleet"];
  const contractors = [];

  for (let i = 1; i <= count; i++) {
    contractors.push({
      id: `FIRM-${i.toString().padStart(4, "0")}`,
      name: `${names[Math.floor(Math.random() * names.length)]} ${Math.floor(Math.random() * 1000)}`,
      nip: `PL${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
      country: countries[Math.floor(Math.random() * countries.length)],
      registrationDate: new Date(Date.now() - Math.random() * 1e10).toISOString().slice(0, 10),
      lastActivity: new Date(Date.now() - Math.random() * 1e9).toISOString().slice(0, 10),
      users: [`user${Math.ceil(Math.random() * 10)}@hogs.live`],
      salespeople: [`handlowiec${Math.ceil(Math.random() * 5)}`]
    });
  }

  return contractors;
}

export default function ContractorsList({ onBack }) {
  const [data] = useState(generateContractors());
  const [sortKey, setSortKey] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const sorted = [...data].sort((a, b) => {
    const valA = a[sortKey]?.toString().toLowerCase();
    const valB = b[sortKey]?.toString().toLowerCase();
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const perPage = 100;
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(data.length / perPage);

  const toggleSort = key => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-blue-600">← Powrót</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Utwórz kontrahenta</button>
      </div>
      <h1 className="text-xl font-bold mb-4">Lista kontrahentów</h1>
      <table className="w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            {["id", "name", "nip", "country", "registrationDate", "lastActivity"].map(key => (
              <th key={key} className="p-2 cursor-pointer" onClick={() => toggleSort(key)}>
                {key.toUpperCase()} {sortKey === key ? (sortAsc ? "↑" : "↓") : ""}
              </th>
            ))}
            <th className="p-2">Użytkownicy</th>
            <th className="p-2">Handlowcy</th>
            <th className="p-2">Opcje</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((c, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{c.id}</td>
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.nip}</td>
              <td className="p-2">{c.country}</td>
              <td className="p-2">{c.registrationDate}</td>
              <td className="p-2">{c.lastActivity}</td>
              <td className="p-2">{c.users.join(", ")}</td>
              <td className="p-2">{c.salespeople.join(", ")}</td>
              <td className="p-2"><button className="text-blue-600">Opcje</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
