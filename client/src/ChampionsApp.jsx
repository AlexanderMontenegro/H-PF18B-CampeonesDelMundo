// UseState y UseEffect
import React, { useState, useEffect } from "react";

// React-router-doom
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

// Vistas (Views)
import HomePage from "./components/HomePage/HomePage";
import LadingPage from "./components/LadingPage/LadingPage";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ProductoCard from "./components/ProductoCard/ProductoCard";
import DashboardPage from "../src/pages/DashboardPage";
import ProductPage from "../src/components/ProductPage/ProductPage";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";

// Components (Componentes)
import Login from "./components/HomePage/Login";
import Register from "./components/HomePage/Register";
import Nosotros from "./components/Nosotros/Nosotros";
import Notificaciones from "./components/Notificaciones/Notificaciones";


// Import Data (db)
// import { data } from './db/db';

// import Dashboard from './components/Dashboard/Dashboard';
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getProducts, setUser } from "./Redux/actions";
import Swal from "sweetalert2";
import Orden from "./components/Orden/Orden";
import Privacy from "./components/Privacy/Privacy";
import Favoritos from "./components/Favoritos/Favoritos";


function ChampionsApp() {
  const dispatch = useDispatch();
  //const stateProducts = useSelector((state) => state.allProducts);

  // PARA PRODUCTOS
  // State y Effect
  // const [productos, setProductos] = useSelector((state) => state.allProducts);
  // console.log("Productos 2: ", productos);

  



    // console.log("PAGO: ", pago)

    // const itemExist = carrito.findIndex((producto) => producto.id === item.id);

    // if (itemExist >= 0) {
    //   // el item ya existe
    //   const updateCarrito = [...carrito];
    //   // const updateTalle = 
    //   updateCarrito[itemExist].quantity++;
    //   setCarrito(updateCarrito);
    // } else {
    //   item.quantity = 1;
    //   setCarrito([...carrito, item]);
    // }
  

  // PARA NOTIFICACIONES
  // State y Effect
  const [notificaciones, setNotificaciones] = useState([]);

  // Funciones
  const addToNotificaciones = (mensaje) => {
    const now = new Date();
    const fecha = now.toLocaleDateString();
    const hora = now.toLocaleTimeString();
   
    // Nueva notificacion
    const nuevaNotificacion = mensaje + ". A las " + hora + ". Con fecha " + fecha 
   
    console.log(nuevaNotificacion)

    // Registrar la nueva compra
    setNotificaciones([...notificaciones, nuevaNotificacion])   
    
  }



  // PARA CARRITO
  // Local Storage
  const initialCarrito = () => {
    const localStorageCarrito = localStorage.getItem("carrito");

    return localStorageCarrito ? JSON.parse(localStorageCarrito) : [];
  };

  // UseState
  // const [productos, setProductos] = useState(stateProducts);
  const [carrito, setCarrito] = useState(initialCarrito);
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 0;

  // console.log("Los productos son: ", productos)

  // UseEffect
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // FUNCIONES
  const addToCarrito = (item) => {
    console.log("CARRITO: ", item)

    const nuevoKey = `${item.id}-${item.talle}`;

    const itemExist = carrito.findIndex(
      (producto) => `${producto.id}-${producto.talle}` === nuevoKey
    );
    //const itemExist = carrito.findIndex((producto) => producto.id === item.id && producto.talle === item.talle);
    //const talleExist = carrito.find((producto) => producto.talle === item.talle);

    if (itemExist >= 0) {
      // el item ya existe
      const updateCarrito = [...carrito];
      updateCarrito[itemExist].quantity++;
      
      setCarrito(updateCarrito); 

      // if ( updateCarrito[itemExist].talle !== item.talle){
      //   item.quantity = 1;
      //   setCarrito([...updateCarrito, item]);
      // }
      // else{
      //   updateCarrito[itemExist].quantity++;
      //   setCarrito(updateCarrito); 
      // }
      
    } else {
      item.quantity = 1;
      // item.talle = "S - 5";
      // updateTalle = [...updateTalle, item.talle]
      setCarrito([...carrito, item]);
    }
  };


  const removeFromCarrito = (id) => {
    setCarrito((prevCarrito) =>
      // prevCarrito.filter((producto) => producto.id !== id)
      prevCarrito.filter((producto) => `${producto.id}-${producto.talle}` !== id)
    );
  };

  const decreaseQuantity = (id) => {
    const updatedCarrito = carrito.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCarrito(updatedCarrito);
  };

  const increaseQuantity = (id) => {
    const updatedCarrito = carrito.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCarrito(updatedCarrito);
  };

  const clearCarrito = () => {
    setCarrito([]);
  };

  // PARA COMPRAS
  const [compras, setCompras] = useState([]);

  // funciones - COMPRAS
  const addToCompras = (productos, pago) => {
    // const currentTimestamp = new Date().toLocaleString();
    const now = new Date();
    const fecha = now.toLocaleDateString();
    const hora = now.toLocaleTimeString();
    
    // Nueva compra
    const nuevaCompra = {
      productos,
      pago,
      fecha, 
      hora
    }
   
    // Registrar la nueva compra
    setCompras([...compras, nuevaCompra])    
  }



  // Navigate y Location
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    async function getAll() {
      try {
        const response = await dispatch(getProducts());
        await dispatch(getCategory());
        if (response.payload.length > 0) {
          /*           Swal.fire({
          /*           Swal.fire({
            icon: "success",
            title: "Datos obtenidos desde el Back",
            text: "",
            timer: 5000,
          }); */
        }
      } catch {
        Swal.fire({
          icon: "error",
          title: "Error del servidor",
          text: "",
          timer: 5000,
        });
      }
    }
    getAll();
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("User");
    console.log("userJSON", userJSON);
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(setUser(user));
    }
  }, []);

  return (
    <>
      <DarkModeToggle />
      <DarkModeToggle />
      <Routes>
        {/* 1.-Ruta Principal - LadingPage */}
        {/* Ruta para la página de inicio */}
        <Route
          path="/"
          element={
            <>
              <LadingPage />
            </>
          }
        ></Route>

        {/* 2.-Ruta SPA - HomePage */}
        {/* Ruta para la página principal */}
        <Route
          path="/homePage"
          element={
            <>
              {/* <HomePage productos={productos}/> home page va hacer uso del estado allProducts */}

              <HomePage
                carrito={carrito}
                addToCarrito={addToCarrito}
                removeFromCarrito={removeFromCarrito}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCarrito={clearCarrito}
                notificaciones={notificaciones}
              />
            </>
          }
        ></Route>
        

        {/* 2.-Ruta SPA - HomePage */}
        {/* Ruta para la página principal */}
        <Route
          path="/orden"
          element={
            <>
              <Orden
                carrito={carrito}
                addToCarrito={addToCarrito}
                removeFromCarrito={removeFromCarrito}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCarrito={clearCarrito}
                notificaciones={notificaciones}
                addToNotificaciones={addToNotificaciones}
                addToCompras={addToCompras}
              />
            </>
          }
        ></Route>

        <Route
          path="/notificaciones"
          element={
            <>
              <Notificaciones
                carrito={carrito}
                addToCarrito={addToCarrito}
                removeFromCarrito={removeFromCarrito}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCarrito={clearCarrito}
                notificaciones={notificaciones}
              />
            </>
          }
        ></Route>

        <Route exact path="/" component={ProductoCard} />
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              carrito={carrito}
              addToCarrito={addToCarrito}
              removeFromCarrito={removeFromCarrito}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              clearCarrito={clearCarrito}
              notificaciones={notificaciones}
              
              
            />
          }
        />

        {/* 5.-Ruta - login */}
        {/* Ruta para la página principal */}
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        ></Route>

        {/* 6.-Ruta - register */}
        {/* Ruta para la página principal */}
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        ></Route>
        <Route
          path="/ProductPage"
          element={
            <>
              <ProductPage
                carrito={carrito}
                addToCarrito={addToCarrito}
                removeFromCarrito={removeFromCarrito}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCarrito={clearCarrito}
                notificaciones={notificaciones}
              />
            </>
          }
        ></Route>

        {/* <Route path='/footer' element={<Footer />} /> */}

        <Route
          path="/dashboard/*"
          element={
            <>
              <DashboardPage
                carrito={carrito}
                addToCarrito={addToCarrito}
                removeFromCarrito={removeFromCarrito}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCarrito={clearCarrito}
              />
            </>
          }
        />

        <Route path="/contacto" element={<Nosotros />}></Route>

        <Route path="/privacidad" element={<Privacy />} />

        <Route path="/favorites" element={<Favoritos />}/><Route/>



      </Routes>
    </>
  );
}

export default ChampionsApp;
