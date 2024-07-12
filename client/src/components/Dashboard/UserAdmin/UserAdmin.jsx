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
    <div className="principal">
      <h1  className="titulo" >Lista de Usuarios</h1>
      <ul className="por__usuario">
        {users.map((user) => (
          <div key={user.uid} className="el__usuario">  
          <div className="los__datos" >      
            <p>
              <strong>Name : </strong> {user.name}
            </p>
            <p>
              <strong>Email : </strong> {user.email}
            </p>
            <p>
              <strong>Rol :  </strong> {user.role}
            </p>
            </div>    
            <div className="los__botones" >
            <button className="eliminar" onClick={() => handleDelete(user.uid)}> <img className="eliminar__img" src="../iconos/delete.png" alt="eliminar" /></button>
            <button className="opciones" onClick={() => handleDelete(user.uid)}> <img className="opciones__img"  src="../iconos/options.png" alt="modificar" /></button>
            <button className="aceptar" onClick={() => handleDelete(user.uid)}> <img className="aceptar__img"  src="../iconos/acept.png" alt="aceptar" /></button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserAdmin;
