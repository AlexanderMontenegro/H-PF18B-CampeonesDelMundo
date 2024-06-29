import React from 'react';
import "../../css/dashadmin.css";

const DashAdmin = () => {
  return (
    <div className="dashboard-main">
      <div className="stats">
        <h2>Listados</h2>
        <div className="listados">
          <button>Listado de Productos</button>
          <button>Listado de Usuarios</button>
          <button>Listado de Pedidos</button>
          <button>Listado de Stock</button>
        </div>
      </div>

      <div className="gestionar-management">
        <h2>Gestionar</h2>
        <div className="gestion-items">
          <button>Gestionar Productos</button>
          <button>Gestionar Usuarios</button>
          <button>Gestionar Administradores</button>
        </div>
      </div>
    </div>
  );
}

export default DashAdmin;
