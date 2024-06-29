import React from 'react';
import DashAdmin from "../components/DashAdmin/DashAdmin";
import Header from '../components/Header/Header';


const Dashboard = () => {
  return (
<div>
<Header/>

    <div className="dashboard">
      <h1>Panel Principal</h1>
      
      <DashAdmin />
      {/* Aquí pueden ir otros componentes del Dashboard */}
    </div>


</div>
  );
}

export default Dashboard;
