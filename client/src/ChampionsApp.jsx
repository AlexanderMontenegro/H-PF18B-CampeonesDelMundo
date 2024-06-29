// UseState y UseEffect
import React, { useState, useEffect } from 'react'

// React-router-doom
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
    Navigate,
} from "react-router-dom";

// Vistas (Views)
import HomePage from './components/HomePage/HomePage';
import LadingPage from './components/LadingPage/LadingPage';

// Import Data (db)
import { data } from './db/db';

import Dashboard from './components/Dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getProducts } from './Redux/actions';
import Swal from 'sweetalert2';


function ChampionsApp() {
    const dispatch = useDispatch();
    const stateProducts = useSelector(state=>state.allProducts);
    
    // Data (db)
    //console.log(data)

    const [productos, setProductos] = useState(stateProducts);

    // Navigate y Location
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(()=>{
dispatch(getCategory());
        dispatch(getProducts()).then(
        Swal.fire({
        icon: "success",
        title: "Datos obtenidos desde el Back",
        text: "",
        timer: 5000
      })
        )

    
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
                            <HomePage/>
                        </>
                    }
                ></Route>
                <Route path='/dashboard/*' element={<Dashboard />} />

            </Routes>         
        </>
    )
}

export default ChampionsApp
