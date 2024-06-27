// UseState y UseEffect
import { useState, useEffect } from 'react'

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
import ProductDetails from './components/ProductDetails/ProductDetails';
import ProductoCard from './components/ProductoCard/ProductoCard';

// Import Data (db)
import { data } from './db/db';


function ChampionsApp() {
    
    // Data (db)
    //console.log(data)

    const [productos, setProductos] = useState(data);

    // Navigate y Location
    const navigate = useNavigate();
    const { pathname } = useLocation();

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
                            <HomePage productos={productos}/>
                        </>
                    }
                ></Route>
                <Route exact path="/" component={ProductoCard} />
                <Route path="/product/:id" component={ProductDetails} />
      

            </Routes>         
        </>
    )
}

export default ChampionsApp
