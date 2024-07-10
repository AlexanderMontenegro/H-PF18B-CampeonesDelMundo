import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth, deleteUser} from "firebase/auth";
import { db } from "../../../../fireBaseConfig";
import "../../../css/useradmin.css";

const UserAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userUid) => {
    try {
      await deleteDoc(doc(db, "users", userUid));
      const auth = getAuth();
      const userToDelete = auth.currentUser;
      await deleteUser(userToDelete);

      setUsers(users.filter((user) => user.uid !== userUid));
    } catch (error) {
      console.error("Error al borrar el usuario:", error);
    }
  };

  return (
    <div className="user-admin">
      <h1>Lista de Usuarios</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.uid} className="user-item">            
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Rol:</strong> {user.role}
            </p>
            <button onClick={() => handleDelete(user.uid)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAdmin;
