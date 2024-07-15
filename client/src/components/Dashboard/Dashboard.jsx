import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import CreateProduct from "./CreateProduct/CreateProduct";
import CreateCategory from "./CreateCategory/CreateCategory";
import StockAdmin from "./StockAdmin/StockAdmin";
import UserAdmin from "./UserAdmin/UserAdmin";

import "../../css/dashboard.css";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const socket = React.useRef(null);

  useEffect(() => {
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

  return (
    <div className="dashboard">
      <div className="options">

        <div className="conteo" >
        <p  className="p__d"  >Usuarios conectados: {userCount}</p>
        </div>

        <div  className="gestion"  >

        <Link to={"createproduct"}>
          <p className="p__d">Gestion Producto</p>
        </Link>
        <Link to={"createcategory"}>
          <p className="p__d">Gestion Categoria</p>
        </Link>
        <Link to={"useradmin"}>
          <p className="p__d">Gestion Usuario</p>
        </Link>
        <Link to={"stockadmin"}>
          <p className="p__d">Gestion Stock</p>
        </Link>
         
        </div>
      </div>

      <Routes>
        <Route path='createproduct' element={<CreateProduct />} />
        <Route path='createcategory' element={<CreateCategory />} />
        <Route path='useradmin' element={<UserAdmin />} />
        <Route path='stockadmin' element={<StockAdmin />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
