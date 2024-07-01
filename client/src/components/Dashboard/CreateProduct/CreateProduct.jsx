import React, { useState, useEffect} from "react";
import validation from "./Validation";
import styles from './CreateProduct.module.css';
import {useSelector, useDispatch } from "react-redux";
import { getCategory, postNewProduct} from "..//..//..//Redux//actions";
import Swal from "sweetalert2";


function createProduct (){
    const dispatch = useDispatch();
    const arrayCategoryGloblal = useSelector(state=>state.allCategory);
    const [arrayCategory, setArrayCategory] = useState(arrayCategoryGloblal);
    let arrayCat = [];
    console.log(arrayCat)
if(arrayCat.length<0){ console.log('enntro') }
   // window.location.reload();
    

    //predeterminado array pais
    const arrayPais = [
    {id:1, pais:'Argentina'},
    {id:2, pais:'Bolivia'},
    {id:3, pais:'Brasil'},
    {id:4, pais:'Chile'},
    {id:5, pais:'Colombia'},
    {id:6, pais:'Ecuador'},
    {id:7, pais:'Paraguay'},
    {id:8, pais:'Peru'},
    {id:9, pais:'Uruguay'},
    {id:10, pais:'Venezuela'}
];


    //estado opciones categoria
    const [opCat,setOpCat] = useState([]);

    // Estado principal 
    const [newProduct, setNewProduct] = useState({
        tipo:'',
        marca:'',
        imagen:'',
        descripcion:'',
        pais:'',
        precio:'',
        stock:'',
        talles:[],
        categoria:''
    });
    // Estado de errores
    const [errors, setErrors] = useState({tipo:'Completa los datos'});


        // Manejador del estado principal
        function handleChange(event) {      
            event.preventDefault();

            if(event.target.name==='talles'){
                console.log('fsfs')
               // event.target.value
                const talles= event.target.value.split(',');
                console.log('con split', talles)
                setErrors(validation({...newProduct,[event.target.name] : talles}));
                setNewProduct({...newProduct,[event.target.name]:talles});
            }else{

 setErrors(validation({...newProduct,[event.target.name] : event.target.value}));
setNewProduct({...newProduct,[event.target.name]:event.target.value})}
}

        // Manejar el cambio de las opciones seleccionadas categoria
  const handleCategoryChange = (event) => {
    event.preventDefault();
    const name = Array.from(event.target.selectedOptions, (option) =>option.value);
    let id = Array.from(event.target.selectedOptions, (option) =>option.id);
    id = parseInt(id[0], 10);
    let obj = {nombre:name[0],id:id}
    setOpCat(opCat=>[...opCat, obj]);
    arrayCat=opCat.concat([obj]);
     const arrayCategoryFilter = arrayCategory.filter(obj => obj.id!==id);
    setArrayCategory(arrayCategoryFilter);

    //convertir array a strin separado por ,
    // Obtener solo los nombres de los objetos
const nombres = arrayCat.map(item => item.nombre);

// Convertir array de nombres a un string separado por comas
const stringCategoria = nombres.join(', ');

  // Crear un elemento div simulado como target
  const target = document.createElement('div');
  target.name = 'categoria'; // Puedes agregar propiedades al target si es necesario
  target.value = stringCategoria;
  // Crear un evento personalizado con un target personalizado
  const eventoPersonalizado = new Event('eventoConTarget', {
    bubbles: true,
    cancelable: true,
  });
  // Agregar el target simulado al evento
  Object.defineProperty(eventoPersonalizado, 'target', { value: target });
  // Llamar a la función para manejar el evento
  handleChange(eventoPersonalizado);
  };


//submit
const handleSubmit= async(event)=>{
    event.preventDefault();
    console.log(opCat)
    console.log(newProduct)
    const response = await dispatch(postNewProduct(newProduct)); 
    if(response.payload.data)
        {
       Swal.fire({
        icon: "success",
        title: 'Registro de Producto Exitoso',
        text: "",
        timer: 3000
      }).then(() => {
    //window.location.reload();
      });         
    }else{
            Swal.fire({
                icon: "error",
                title: 'Error al Registrar Producto',
                text: "",
                timer: 3000
              })   
        }
    }

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
      <label>Precio $</label> 
    <input 
    type="text" 
        className={styles.form_style} 
        name='precio' 
        value={newProduct.precio} 
        onChange={handleChange} />
    {errors.precio&&<p className={styles.errors}>{errors.precio}</p>}
    </div>

    <div className={styles.field}>
      <label>Stock</label> 
    <input 
    type="text" 
        className={styles.form_style} 
        name='stock' 
        value={newProduct.stock} 
        onChange={handleChange} />
    {errors.stock&&<p className={styles.errors}>{errors.stock}</p>}
    </div>

    <div className={styles.field}>
                <label>Talles</label>
                <input 
        type="text" 
        className={styles.form_style} 
        name='talles' 
        value={newProduct.talles} 
        onChange={handleChange}
        />

    {errors.talles &&<p className={styles.errors}>{errors.talles}</p>}
</div>

            <div className={styles.field}>
                <label>Categoria</label>
                {errors.categoria &&<p className={styles.errors}>{errors.categoria}</p>}
                <select multiple name="categoria" value={opCat} onChange={handleCategoryChange}  className={styles.form_style}>
    {arrayCategory.map((objeto) => (
          <option key={objeto.id} value={objeto.nombre} id={objeto.id}>
            {objeto.nombre}
          </option>
        ))}
    </select>

    

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
    {newProduct.imagen && <><br/><img src={newProduct.imagen} alt="Vista previa de la imagen" 
    style={{ maxWidth: '300px', maxHeight: '300px' }} /></>}
    {errors.imagen&&<p className={styles.errors}>{errors.imagen}</p>}
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

            <div className={styles.field}>
            <label>Pais</label> 
    <select name='pais' value={newProduct.pais} onChange={handleChange}  className={styles.form_style}>
    <option value='' disabled hidden>Selecciona Pais</option>
    {arrayPais.map((objeto) => (
          <option key={objeto.id} value={objeto.pais}>
            {objeto.pais}
          </option>
        ))}
    </select>
    {errors.pais&&<p className={styles.errors}>{errors.pais}</p>}
            </div>

    <button onClick={handleSubmit} 
    disabled={Object.keys(errors).length === 0? false : true} 
    className={`styles.btn ${ Object.keys(errors).length > 0? '.dis' : ''}`}>
    Registrar</button>
        </form>
    )
}

export default createProduct;