import React from "react";
import { Link, Route, Routes } from "react-router-dom"
import CreateProduct from "./CreateProduct/CreateProduct";
import CreateCategory from "./CreateCategory/CreateCategory"
import StockAdmin from "./StockAdmin/StockAdmin";
import UserAdmin from "./UserAdmin/UserAdmin";


import "../../css/dashboard.css"


function Dashboard (){

    return (
      
                <div className="dashboard">
                    
                <div className="options">
         
                    <Link to={"createproduct"} >
                        <p className="p__d"> Gestion Producto</p>
                    </Link>
                    <Link to={"createcategory"} >
                        <p className="p__d"> Gestion Categoria</p>
                    </Link>
                    <Link to={"useradmin"} >
                        <p className="p__d"> Gestion Usuario</p>
                    </Link>
                    <Link to={"stockadmin"} >
                        <p className="p__d"> Gestion Stock</p>
                    </Link>
                   
                    <div className="list">

                    </div>

                </div>

            
                <Routes>
                        <Route path='createproduct' element={<CreateProduct />} />
                        <Route path='createcategory' element={<CreateCategory />} />
                        <Route path='useradmin' element={<UserAdmin />} />
                        <Route path='stockadmin' element={<StockAdmin />} />
                        
                    </Routes>
                </div>
       
    )  
}

export default Dashboard;