"use client";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Buscar usuários do banco ao carregar a página
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const addUser = async () => {
    if (!name || !email) return alert("Preencha todos os campos!");
  
    console.log("Enviando dados:", { name, email });
  
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
  
    const data = await res.json();
    
    if (res.ok) {
      console.log("Usuário adicionado com sucesso:", data);
      setName("");
      setEmail("");
      fetchUsers(); // Atualiza a lista de usuários
    } else {
      console.error("Erro ao adicionar usuário:", data);
      alert("Erro ao adicionar usuário");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-amber-700 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Usuários</h1>

        {/* Formulário de Adição */}
        <div className="space-y-3">
          <input
            className="border p-2 w-full rounded"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 w-full rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={addUser}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
          >
            Adicionar Usuário
          </button>
        </div>

        {/* Lista de Usuários */}
        <h2 className="text-xl font-semibold mt-6">Lista de Usuários</h2>
        <ul className="mt-2 divide-y">
          {users.map((user) => (
            <li key={user.id} className="py-2">
              <span className="font-medium">{user.name}</span> - <span className="text-gray-600">{user.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
