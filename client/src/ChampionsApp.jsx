
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

// Components (Componentes)
import Login from "./components/HomePage/Login";
import Register from "./components/HomePage/Register";

// Import Data (db)
// import { data } from './db/db';

// import Dashboard from './components/Dashboard/Dashboard';
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getProducts } from "./Redux/actions";
import Swal from "sweetalert2";

function ChampionsApp() {
  const dispatch = useDispatch();
  const stateProducts = useSelector((state) => state.allProducts);

  // Local Storage
  const initialCarrito = () => {
    const localStorageCarrito = localStorage.getItem('carrito')

    return localStorageCarrito ? JSON.parse(localStorageCarrito) : [];
  }

  // UseState
  const [productos, setProductos] = useState(stateProducts);
  const [carrito, setCarrito] = useState(initialCarrito);
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 0;

  // UseEffect
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  // FUNCIONES
  const addToCarrito = (item) => {
    const itemExist = carrito.findIndex((producto) => producto.id === item.id);

    if (itemExist >= 0) {
      // el item ya existe
      const updateCarrito = [...carrito];
      updateCarrito[itemExist].quantity++;
      setCarrito(updateCarrito);
    } else {
      item.quantity = 1;
      setCarrito([...carrito, item]);
    }
  };

  const removeFromCarrito = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((producto) => producto.id !== id)
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

  // Local Storage - Carrito
  

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

  return (
    <>
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
                productos={productos}
                carrito={carrito}
                addToCarrito={addToCarrito}
                removeFromCarrito={removeFromCarrito}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCarrito={clearCarrito}
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
            />
          }
        />

        {/* 5.-Ruta - login */}
        {/* Ruta para la página principal */}
        <Route
          path="/login"
          element={
            <>
              <Login
                carrito={carrito}
                addToCarrito={addToCarrito}
                removeFromCarrito={removeFromCarrito}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCarrito={clearCarrito}
              />
            </>
          }
        ></Route>

        {/* 6.-Ruta - register */}
        {/* Ruta para la página principal */}
        <Route
          path="/register"
          element={
            <>
              <Register
                carrito={carrito}
                addToCarrito={addToCarrito}
                removeFromCarrito={removeFromCarrito}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCarrito={clearCarrito}
              />
            </>
          }
        ></Route>
        <Route
          path="/ProductPage"
          element={
            <>
              <ProductPage
                carrito={carrito}
                removeFromCarrito={removeFromCarrito}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCarrito={clearCarrito}
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
      </Routes>
    </>
  );
}

export default ChampionsApp;
