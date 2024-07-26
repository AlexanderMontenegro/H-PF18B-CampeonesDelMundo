import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import CreateProduct from "./CreateProduct/CreateProduct";
import CreateCategory from "./CreateCategory/CreateCategory";
import StockAdmin from "./StockAdmin/StockAdmin";
import UserAdmin from "./UserAdmin/UserAdmin";
import Updateproduct from './UpdateProduct/updateProduct';
import "../../css/dashboard.css";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const socket = React.useRef(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    /*Deploy*/
    //socket.current = io('https://h-pf18b-campeonesdelmundo-b.onrender.com');


    /*Local*/
    socket.current = io('http://localhost:3001');

    socket.current.on('updateUsers', (count) => {
      setUserCount(count);
    });

    socket.current.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const handleAccessDenied = () => {
    Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'No tienes permisos para acceder a esta sección',
    });
  };

  return (
    <div className="dashboard">
      <div className="options">
        <div className="conteo">
          <p className="p__d">Usuarios conectados: {userCount}</p>
        </div>
        <div className="gestion">
          <Link to={"createproduct"}>
            <p className="p__d">Gestion Producto</p>
          </Link>
          <Link to={"createcategory"}>
            <p className="p__d">Gestion Categoria</p>
          </Link>
          {user && user.role === 'super-admin' ? (
            <Link to={"useradmin"}>
              <p className="p__d">Gestion Usuario</p>
            </Link>
          ) : (
            <p className="p__d" onClick={handleAccessDenied}>Gestion Usuario</p>
          )}
          <Link to={"stockadmin"}>
            <p className="p__d">Gestion Stock</p>
          </Link>
          <Link to={"updateproduct"}>
            <p className="p__d">Gestion Productos</p>
          </Link>
        </div>
      </div>

      <Routes>
        <Route path='createproduct' element={<CreateProduct />} />
        <Route path='createcategory' element={<CreateCategory />} />
        <Route path='useradmin' element={<UserAdmin />} />
        <Route path='stockadmin' element={<StockAdmin />} />
        <Route path='updateproduct' element={<Updateproduct />} />
      </Routes>
    </div>
  );
};

export default Dashboard;