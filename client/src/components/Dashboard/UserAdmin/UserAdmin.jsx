import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../../fireBaseConfig';
import '../../../css/useradmin.css'

const UserAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-admin">
      <h1>Lista de Usuarios</h1>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.uid} className="user-item">
            <p><strong>UID:</strong> {user.uid}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {user.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAdmin;