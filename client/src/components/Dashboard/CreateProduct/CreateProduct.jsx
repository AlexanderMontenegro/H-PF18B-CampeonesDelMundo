import React, { useState } from "react";
import validation from "./Validation";
import styles from './CreateProduct.module.css';
import { useSelector } from "react-redux";

function createProduct (){
    const arrayCategory = useSelector(state=>state.allCategory);
    console .log('cater', arrayCategory);

    // Estado principal 
    const [newProduct, setNewProduct] = useState({
        tipo:'',
        marca:''});
    // Estado de errores
    const [errors, setErrors] = useState({tipo:'Completa los datos'});
    //estado opciones categoria
    const [opCat,setOpCat] = useState([]);

        // Manejador del estado principal
        function handleChange(event) {      
            event.preventDefault();
            setErrors(validation({...newProduct,[event.target.name] : event.target.value
                })
            );
        setNewProduct({...newProduct,[event.target.name]:event.target.value});
        }


            // Manejar el cambio de las opciones seleccionadas categoria
    const handleCategoryChange = (event) => {
        event.preventDefault();
        const opCategory = Array.from(event.target.selectedOptions, (option) => option.value);
        setOpCat(opCategory);
        const atrCat = opCategory[0];
       setNewProduct({...newProduct, categoria:atrCat});
       setErrors(validation({...newProduct,categoria: atrCat}))
      };


    return (
        <form className={styles.form}>
            <h3 className={styles.title}>Nuevo Producto</h3>
            <div className={styles.field}>
                <label>Tipo</label>
                <input
                    type="text"
                    className={styles.form_style}
                    name='tipo'
                    value={newProduct.tipo}
                    onChange={handleChange}
                />
                {errors.tipo && <p className={styles.errors}>{errors.tipo}</p>}
            </div>

            <div className={styles.field}>
                <label>Marca</label>
                <input
                    type="text"
                    className={styles.form_style}
                    name='marca'
                    value={newProduct.marca}
                    onChange={handleChange}
                />
                {errors.marca && <p className={styles.errors}>{errors.marca}</p>}
            </div>

            <div className={styles.field}>
                <label>Categoria</label>
                <select multiple name="category" value={opCat} onChange={handleCategoryChange}>
    {arrayCategory.map((objeto) => (
          <option key={objeto.id} value={objeto.nombre} id={objeto.id}>
            {objeto.nombre}
          </option>
        ))}
    </select>

    {errors.categoria!==''&&<p className={styles.errors}>{errors.categoria}</p>}
            </div>
            <div>
        <h4>Opciones seleccionadas:</h4>
        
           {opCat.map((opcion) => (
            <p key={opcion.id}>{opcion.nombre}</p>
          ))}
          {console.log('catego',opCat)} 
       
      </div>
        </form>
    )
}

export default createProduct;