import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
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

  // Borrar usuarios
  const handleDelete = async (userUid) => {
    try {
      await deleteDoc(doc(db, "users", userUid));
      setUsers(users.filter((user) => user.uid !== userUid));
      Swal.fire({
        icon: "success",
        title: "Usuario eliminado",
        text: "El usuario ha sido eliminado correctamente",
        confirmButtonText: "Aceptar"
      });
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

  // Modificar roles
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
      console.error("Error al actualizar el rol", error);
    }
  };

  return (
    <div className="principal">
      <h1 className="titulo">Lista de Usuarios</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.uid} className="el__usuario">
            <div className="los__datos">
              <p className="por__usuario">
                <strong>Nombre:</strong> {user.name}
              </p>
              <p className="por__usuario">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="por__usuario">
                <strong>Rol:</strong> {user.role}
              </p>
            </div>
            <div className="los__botones">
              {editUserId === user.uid ? (
                <>
                  <select value={newRole} onChange={handleChangeRole} className="opcionesg">
                    <option value="">****</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Super-Admin">Super-Admin</option>
                  </select>
                  <button onClick={() => handleSaveRole(user.uid)} className="aceptar">
                    <img src="/iconos/acept.png" alt="aceptar" />
                  </button>
                  <button onClick={() => setEditUserId(null)} className="eliminar">
                    <img src="/iconos/delete.png" alt="cancelar" />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditRole(user.uid)} className="opciones">
                    <img src="/iconos/options.png" alt="opciones" />
                  </button>
                  <button onClick={() => handleDelete(user.uid)} className="eliminar">
                    <img src="/iconos/delete.png" alt="eliminar" />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAdmin;
