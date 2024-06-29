import React, { useState } from "react";
import validation from "./Validation";
import styles from './CreateProduct.module.css';
import { useSelector } from "react-redux";


function createProduct (){
    const arrayCategoryGloblal = useSelector(state=>state.allCategory);
    const [arrayCategory, setArrayCategory] = useState(arrayCategoryGloblal);

    //estado opciones categoria
    const [opCat,setOpCat] = useState([]);

    // Estado principal 
    const [newProduct, setNewProduct] = useState({
        tipo:'',
        marca:'',
        imagen:'',
        descripcion:''
    });
    // Estado de errores
    const [errors, setErrors] = useState({tipo:'Completa los datos'});


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
    const name = Array.from(event.target.selectedOptions, (option) =>option.value);
    let id = Array.from(event.target.selectedOptions, (option) =>option.id);
    id = parseInt(id[0], 10);
    let obj = {nombre:name[0],id:id}
    setOpCat([...opCat, obj]);
     const arrayCategoryFilter = arrayCategory.filter(obj => obj.id!==id);
    setArrayCategory(arrayCategoryFilter);
  };

//submit
const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(opCat)
    console.log(newProduct)
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
                <select multiple name="categoria" value={opCat} onChange={handleCategoryChange}>
    {arrayCategory.map((objeto) => (
          <option key={objeto.id} value={objeto.nombre} id={objeto.id}>
            {objeto.nombre}
          </option>
        ))}
    </select>

    {errors.categoria &&<p className={styles.errors}>{errors.categoria}</p>}

    <label>Opciones seleccionadas:</label>
        
        {opCat.map((opcion) => (
         <p key={opcion.id}>{opcion.nombre}</p>
       ))}

            </div>
    
      <div className={styles.field}>
      <label>Imagen </label> 
    <input 
    type="text" 
        className={styles.form_style} 
        name='imagen' 
        value={newProduct.imagen} 
        onChange={handleChange} 
        placeholder="URL de imagen"/>
    {newProduct.imagen && <img src={newProduct.imagen} alt="Vista previa de la imagen" 
    style={{ maxWidth: '300px', maxHeight: '300px' }} />}
    {errors.imagen!==''&&<p className={styles.errors}>{errors.imagen}</p>}
    </div>

    <div className={styles.field}>
                <label>Descripcion</label>
                <textarea
                    rows='4'
                    cols='35'
                    name="descripcion"
                    className={styles.form_style}
                    value={newProduct.descripcion}
                    onChange={handleChange}
                />
                {errors.descripcion && <p className={styles.errors}>{errors.descripcion}</p>}
            </div>

    <button onClick={handleSubmit}  className={styles.btn} >Registrar</button>
        </form>
    )
}

export default createProduct;