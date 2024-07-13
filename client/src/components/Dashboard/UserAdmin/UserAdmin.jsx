import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";
import { db } from "../../../../fireBaseConfig";
import "../../../css/useradmin.css";

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [newRole, setNewRole] = useState("");

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


  //borrar usuarios
  const handleDelete = async (userUid) => {
    try {
      await deleteDoc(doc(db, "users", userUid));
      const auth = getAuth();
      const userToDelete = auth.currentUser;
      if (userToDelete) {
        await deleteUser(userToDelete);
      } else {
        console.error("no existe");
      }
      setUsers(users.filter((user) => user.uid !== userUid));
    } catch (error) {
      console.error("Error", error);
    }
  };



  //modificar roles
  const handleEditRole = (userUid) => {
    setEditUserId(userUid);
  };

  const handleChangeRole = (event) => {
    setNewRole(event.target.value);
  };

  const handleSaveRole = async (userUid) => {
    try {
      const userDoc = doc(db, "users", userUid);
      await updateDoc(userDoc, {
        role: newRole,
      });

      setUsers(
        users.map((user) =>
          user.uid === userUid ? { ...user, role: newRole } : user
        )
      );
      setEditUserId(null);
      setNewRole("");
    } catch (error) {
      console.error("Error", error);
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
            {editUserId === user.uid ? (
              <>
                <select value={newRole} onChange={handleChangeRole}>
                  <option value="">cambiar rol</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Super-Admin">Super-Admin</option>
                </select>
                <button onClick={() => handleSaveRole(user.uid)}>
                  Guardar
                </button>
                <button onClick={() => setEditUserId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <button onClick={() => handleEditRole(user.uid)}>
                  Cambiar Rol
                </button>
                <button onClick={() => handleDelete(user.uid)}>
                  Borrar usuario
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAdmin;

{/* <div className="los__botones" >
            <button className="eliminar" onClick={() => handleDelete(user.uid)}> <img className="eliminar__img" src="../iconos/delete.png" alt="eliminar" /></button>
            <button className="opciones" onClick={() => handleDelete(user.uid)}> <img className="opciones__img"  src="../iconos/options.png" alt="modificar" /></button>
            <button className="aceptar" onClick={() => handleDelete(user.uid)}> <img className="aceptar__img"  src="../iconos/acept.png" alt="aceptar" /></button>
            </div> */}