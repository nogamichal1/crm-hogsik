export const searchKeys = [
  "Klient", "NIP", "Numer rezerwacji", "NR AUTA", "nr FV operatora",
  "Numer proformy", "Faktura sprzedaży", "Nr korekty", "Uwagi", "Komentarz",
];

export function filterOrders(orders, term) {
  if (!term) return orders;
  const lower = term.toLowerCase();
  return orders.filter(order =>
    Object.entries(order).some(([k, v]) =>
      searchKeys.includes(k) && String(v).toLowerCase().includes(lower)
    )
  );
}
