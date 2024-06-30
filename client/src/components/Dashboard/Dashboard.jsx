import React from "react";
import { Link, Route, Routes } from "react-router-dom"
import CreateProduct from "./CreateProduct/CreateProduct";
import CreateCategory from "./CreateCategory/CreateCategory"
import Header from '..//..//components//Header//Header';
import style from './Dashboard.module.css'

function Dashboard (){

    return (
        <>
        
        <div>
                <div className={style.dashboard}>
                <div className={style.options}>
                    <Link to={"createproduct"} >
                        <p> Crear Producto</p>
                    </Link>
                    <Link to={"createcategory"} >
                        <p> Crear Categoria</p>
                    </Link>
                    <div className={style.list}>

                    </div>

                </div>

                <div className={style.form}></div>
                <Routes>
                        <Route path='createproduct' element={<CreateProduct />} />
                        <Route path='createcategory' element={<CreateCategory />} />
                    </Routes>
                </div>
        </div>
    </>)
}

export default Dashboard;