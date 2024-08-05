import React from 'react';
import Header from '../components/Header/Header';
// import {Footer} from "../components/Footer/index"
import Footer from '../components/Footer/Footer';
import Dashboard from '../components/Dashboard/Dashboard';


const DashboardPage = ({carrito, addToCarrito, removeFromCarrito, increaseQuantity, decreaseQuantity, clearCarrito}) => {
  return (
<div>
  <div className="productpage__header">
  
<Header 
  carrito={carrito}
  addToCarrito={addToCarrito}
  removeFromCarrito={removeFromCarrito}
  increaseQuantity={increaseQuantity}
  decreaseQuantity={decreaseQuantity}
  clearCarrito={clearCarrito}
/>
  </div>

    <div >
      <Dashboard c
        carrito={carrito}
        addToCarrito={addToCarrito}
        removeFromCarrito={removeFromCarrito}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCarrito={clearCarrito}
      />

    </div>
<Footer/>

</div>
  );
}

export default DashboardPage;
