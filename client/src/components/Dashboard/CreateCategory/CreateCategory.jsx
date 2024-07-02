import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { postCategory} from "..//..//..//Redux//actions";
import Swal from "sweetalert2";
import "../../../css/createcategoria.css";

function createCategory(){
    const [categoryName, setCategoryName] = useState('');
    const arrayCategory = useSelector((state) => state.allCategory);
    const dispatch = useDispatch();

    //submit
    async function handleSubmit(event){
        event.preventDefault();
        const regexCategoria = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;       
        const test = regexCategoria.test(categoryName);
        const existe = arrayCategory.some(objeto => objeto.nombre === categoryName);
        if(test && !existe)
            {
            
            const objCategory = {nombre:categoryName};
            const response = await dispatch(postCategory(objCategory)); 

    if(response.payload.data)
    {
   Swal.fire({
    icon: "success",
    title: 'Registro de Categoria Exitoso',
    text: "",
    timer: 3000
  }).then(() => {
window.location.reload();
  });         
    }
}else{
if(existe)
    {
        Swal.fire({
            icon: "error",
            title: 'Categoria ya Existe',
            text: "",
            timer: 3000
          }) 
    }else{
        Swal.fire({
            icon: "error",
            title: 'Error al Registrar categoria debe ser letras',
            text: "",
            timer: 3000
          })  
        } 
    }
    };

    return (
        <div className="UpdateCategorias">
        <form onSubmit={handleSubmit} className="form">
            <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="input"
                placeholder="Nombre Categoria"
            />
            <button type="submit" className="button">Crear Categoria </button>
        </form>
        <div className="categoryList">
            {arrayCategory.map((category) => (
                <div key={category.id} className="categoryItem">
                    {category.nombre}
                </div>
            ))}
        </div> 
    </div>
    )
}

export default createCategory;