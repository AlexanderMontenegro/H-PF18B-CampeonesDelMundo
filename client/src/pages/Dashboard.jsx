import React from 'react';
import DashAdmin from "../components/DashAdmin/DashAdmin";
import Header from '../components/Header/Header';
// import {Footer} from "../components/Footer/index"
import Footer from '../components/Footer/Footer';


const Dashboard = ({carrito, addToCarrito, removeFromCarrito, increaseQuantity, decreaseQuantity, clearCarrito}) => {
  return (
<div>
<Header
  carrito={carrito}
  addToCarrito={addToCarrito}
  removeFromCarrito={removeFromCarrito}
  increaseQuantity={increaseQuantity}
  decreaseQuantity={decreaseQuantity}
  clearCarrito={clearCarrito}
/>

    <div >
      <DashAdmin />

    </div>
<Footer/>

</div>
  );
}

export default Dashboard;
