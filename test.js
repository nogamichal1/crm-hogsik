import assert from 'assert';
import { filterOrders } from './src/utils/filterOrders.js';

const orders = [
  { "Klient": "ABC", "Uwagi": "test" },
  { "Klient": "XYZ", "Uwagi": "demo" },
];

const res1 = filterOrders(orders, 'abc');
assert.strictEqual(res1.length, 1, 'Powinien znaleźć 1 rekord');

const res2 = filterOrders(orders, '');
assert.strictEqual(res2.length, 2, 'Brak filtra zwraca wszystkie rekordy');

console.log('Tests passed');
