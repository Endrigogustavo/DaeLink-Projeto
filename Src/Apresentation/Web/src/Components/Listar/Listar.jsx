// src/Components/Listar/Listar.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import { db } from '../../Database/Firebase';
import { addDoc, collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const Listar = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const userCollection = collection(db, "users");

  const criarCadastro = async () => {
    await addDoc(userCollection, { nome, email });
    setNome("");
    setEmail("");
  };


  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder='Nome...'
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder='Email...'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={criarCadastro}>Criar User</button>
      <h1>Users List</h1>
      <ul>
        {users.map(user => (
          <div key={user.id}>
            <li>
              {user.nome} - {user.email}
            </li>
            <button onClick={() => deleteUser(user.id)}>Deletar</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Listar;
