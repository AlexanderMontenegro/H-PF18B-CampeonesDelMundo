import React from "react";
import { Link, Route, Routes } from "react-router-dom"
import CreateProduct from "./CreateProduct/CreateProduct";
import CreateCategory from "./CreateCategory/CreateCategory"
import Header from '..//..//components//Header//Header';
import "../../css/dashboard.css"

function Dashboard (){

    return (
        <>
        
        <div>
                <div className="dashboard">
                <div className="options">
                    <Link to={"createproduct"} >
                        <p> Gestion Producto</p>
                    </Link>
                    <Link to={"createcategory"} >
                        <p> Gestion Categoria</p>
                    </Link>
                    <Link to={"createproduct"} >
                        <p> Gestion Usuario</p>
                    </Link>
                    <Link to={"createcategory"} >
                        <p> Gestion Stock</p>
                    </Link>
                   
                    <div className="list">

                    </div>

                </div>

                <div ></div>
                <Routes>
                        <Route path='createproduct' element={<CreateProduct />} />
                        <Route path='createcategory' element={<CreateCategory />} />
                    </Routes>
                </div>
        </div>
    </>)
}

export default Dashboard;