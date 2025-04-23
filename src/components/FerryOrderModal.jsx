
import React, { useState, useEffect } from "react";

export default function FerryOrderModal({ onClose, onSave, initialData }) {
  const [form, setForm] = useState(
    initialData || {
      FerryOrderCompany: "", FerryOrderCompanyVat: "", FerryOrderReservationNr: "", FerryOrderVehiclePlates: "", FerryOrderRoute: "", FerryOrderOrderDate: "", FerryOrderPlannedCrossingDate: "",
      FerryOrderCrossingHour: "", FerryOrderOperator: "", FerryOrderVehicleLength: "", FerryOrderProvidor: "", FerryOrderOurPrice: "", FerryOrderCustomerPrice: "",
      FerryOrderMargin: "", FerryOrderOperatorFv: "", FerryOrderOperatorFvPrice: "", FerryOrderRealMargin: "", FerryOrderRealCrossingDate: "", FerryOrderProformaNr: "",
      FerryOrderFvNr: "", FerryOrderFvCorrectionNr: "", FerryOrderIsFactoring: "nie", FerryOrderComments: "", FerryOrderComment: ""
    }
  );

  useEffect(() => {
    const FerryOrderMargin = parseFloat(form.FerryOrderCustomerPrice || 0) - parseFloat(form.FerryOrderOurPrice || 0);
    const FerryOrderRealMargin = parseFloat(form.FerryOrderCustomerPrice || 0) - parseFloat(form.FerryOrderOperatorFvPrice || 0);
    setForm((prev) => ({
      ...prev,
      FerryOrderMargin: FerryOrderMargin.toFixed(2),
      FerryOrderRealMargin: FerryOrderRealMargin.toFixed(2),
    }));
  }, [form.FerryOrderCustomerPrice, form.FerryOrderOurPrice, form.FerryOrderOperatorFvPrice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-20 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-6xl shadow-lg overflow-y-FerryOrderVehiclePlates max-h-[90vh] text-sm">
        <h2 className="text-xl font-bold mb-4">{initialData ? "Edytuj" : "Dodaj"} zamówienie promowe</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            ["Klient", "FerryOrderCompany", "select"],
            ["NIP", "FerryOrderCompanyVat", "text", true],
            ["Numer rezerwacji", "FerryOrderReservationNr", "text"],
            ["NR AUTA", "FerryOrderVehiclePlates", "text"],
            ["Trasa", "FerryOrderRoute", "select"],
            ["Data zamówienia", "FerryOrderOrderDate", "date"],
            ["Planowana data przeprawy", "FerryOrderPlannedCrossingDate", "date"],
            ["Godzina przeprawy", "FerryOrderCrossingHour", "time"],
            ["Operator", "FerryOrderOperator", "select"],
            ["Długość auta", "FerryOrderVehicleLength", "text"],
            ["Gdzie zamawiamy", "FerryOrderProvidor", "text"],
            ["Nasza cena", "FerryOrderOurPrice", "number"],
            ["Cena klienta", "FerryOrderCustomerPrice", "number"],
            ["Marża", "FerryOrderMargin", "readonly"],
            ["nr FV operatora", "FerryOrderOperatorFv", "text"],
            ["Kwota na FV od Operatora", "FerryOrderOperatorFvPrice", "number"],
            ["Marża rzeczywista", "FerryOrderRealMargin", "readonly"],
            ["Data przeprawy", "FerryOrderRealCrossingDate", "date"],
            ["Numer proformy", "FerryOrderProformaNr", "text"],
            ["Faktura sprzedaży", "FerryOrderFvNr", "text"],
            ["Nr korekty", "FerryOrderFvCorrectionNr", "text"],
            ["Zgłoszenie do faktoringu", "FerryOrderIsFactoring", "select2"],
          ].map(([label, name, type, disabled]) => (
            <div key={name}>
              <label className="block font-medium">{label}</label>
              {type === "select" ? (
                <input
                  type="text"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder="Wpisz i wybierz klienta (baza do wdrożenia)"
                  className="w-full border p-1 rounded dark:bg-gray-700 dark:text-white"
                />
              ) : type === "select2" ? (
                <select
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full border p-1 rounded dark:bg-gray-700 dark:text-white"
                >
                  <option value="tak">tak</option>
                  <option value="nie">nie</option>
                </select>
              ) : type === "readonly" ? (
                <input
                  type="text"
                  name={name}
                  value={form[name]}
                  disabled
                  className="w-full border p-1 rounded bg-gray-100 dark:bg-gray-600 dark:text-white"
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  disabled={disabled}
                  className="w-full border p-1 rounded dark:bg-gray-700 dark:text-white"
                />
              )}
            </div>
          ))}
          <div className="col-span-3">
            <label className="block font-medium">Uwagi</label>
            <textarea
              name="FerryOrderComments"
              value={form.FerryOrderComments}
              onChange={handleChange}
              className="w-full border p-1 rounded dark:bg-gray-700 dark:text-white"
              rows="2"
            />
          </div>
          <div className="col-span-3">
            <label className="block font-medium">Komentarz</label>
            <textarea
              name="FerryOrderComment"
              value={form.FerryOrderComment}
              onChange={handleChange}
              className="w-full border p-1 rounded dark:bg-gray-700 dark:text-white"
              rows="2"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-700 dark:text-white"
          >
            Anuluj
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {initialData ? "Zapisz" : "Dodaj"}
          </button>
        </div>
      </div>
    </div>
  );
}
