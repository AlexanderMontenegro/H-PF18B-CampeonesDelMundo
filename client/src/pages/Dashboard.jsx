import React from 'react';
import DashAdmin from "../components/DashAdmin/DashAdmin";
import Header from '../components/Header/Header';
import {Footer} from "../components/Footer/index"


const Dashboard = () => {
  return (
<div>
<Header/>

    <div >
      <DashAdmin />

    </div>
<Footer/>

</div>
  );
}

export default Dashboard;
