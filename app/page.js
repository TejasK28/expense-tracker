'use client';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDoc, querySnapshot, onSnapshot, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export default function Home() {
  const [items, setItems] = useState([
    // { name: 'Movie', price: 24.95 },
    // { name: 'Only', price: 244.95 },
  ]);

  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'items'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id:doc.id});
      });
      setItems(itemsArr);
    })
  }
  )

  useEffect(() => {
    // Calculate the total whenever items change
    const totalAmount = items.reduce((acc, item) => acc + parseFloat(item.price), 0);
    setTotal(totalAmount);
  }, [items]);

  const addItem = async (e) => {
    e.preventDefault();

    if (newItem.name.trim() !== '' && newItem.price !== '') {
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: parseFloat(newItem.price),
      });

      setItems([...items, { name: newItem.name.trim(), price: parseFloat(newItem.price) }]);
      setNewItem({ name: '', price: '' });
    }
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>

        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black" onSubmit={addItem}>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-3 p-4 border"
              placeholder="Enter item"
              type="text"
            />
            <input
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="col-span-2 p-4 border mx-3"
              placeholder="Enter $"
              type="number"
            />
            <button className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl" type="submit">
              +
            </button>
          </form>

          <ul>
            {items.map((item, id) => (
              <li key={id} className="my-4 w-full flex justify-between bg-slate-950">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                <button onClick={() => deleteItem(item.id)}className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16">
                  X
                </button>
              </li>
            ))}
          </ul>

          {items.length > 0 && (
            <div className="flex justify-between p-3">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
