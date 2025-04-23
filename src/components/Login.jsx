import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.endsWith("@hogs.live")) {
      setError("Dozwolone są tylko adresy @hogs.live");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(email);
    } catch {
      setError("Nieprawidłowy email lub hasło");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen hogs-login">
      <div className="bg-white rounded shadow-lg p-8 w-[350px]">
        <div className="text-center py-2 font-bold text-xl mb-6 text-gray-800">
          HOGS CRM
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="ENTER USERNAME" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full rounded" />
          <input type="password" placeholder="ENTER PASSWORD" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full rounded" />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="w-full py-2 bg-gradient-to-r from-purple-500 via-blue-400 to-lime-400 text-white rounded font-semibold">LOGIN</button>
        </form>
      </div>
    </div>
  );
}
