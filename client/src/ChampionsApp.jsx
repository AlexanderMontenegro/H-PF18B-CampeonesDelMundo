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


function ChampionsApp() {
    
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
                            <HomePage />
                        </>
                    }
                ></Route>

            </Routes>         
        </>
    )
}

export default ChampionsApp
