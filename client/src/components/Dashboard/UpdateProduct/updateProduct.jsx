import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putUpdateProduct, postImageRemota, postImageLocal } from "../../../Redux/actions";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../css/createproducto.css";

function updateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const arrayProduct = useSelector((state) => state.allProducts);
  const [data, setData] = useState(arrayProduct);
  const [selectedObject, setSelectedObject] = useState(null);

  const handleSelect = (obj) => {
    setSelectedObject(obj);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedObject({
      ...selectedObject,
      [name]: value,
    });
  };

  //Guardar
  const handleSave = async ()  => {
 const response= await dispatch(putUpdateProduct(selectedObject));
console.log('res',response)
if(response.payload.data)
{
  Swal.fire({
    icon: "success",
    title: 'Producto Actualizado',
    text: "",
    timer: 3000,
  }).then(() => {
    //Redirigir después de que la alerta se cierre
    navigate("/dashboard/"); // Cambia la URL al destino
    window.location.reload();
  });
}

  };

  const handleImageLocal = async (event) => {
    event.preventDefault();
    const image = event.target.files[0];
    const response = await dispatch(postImageLocal(image));
    const imageUrl = response.payload.imageUrl;
    console.log('response imagen', imageUrl);
    
    if(imageUrl){
    // Crear un elemento div simulado como target
    const target = document.createElement("div");
    target.name = "imagen"; // Puedes agregar propiedades al target si es necesario
    target.value = imageUrl;
    // Crear un evento personalizado con un target personalizado
    const eventoPersonalizado = new Event("eventoConTarget", {
      bubbles: true,
      cancelable: true,
    });
    // Agregar el target simulado al evento
    Object.defineProperty(eventoPersonalizado, "target", { value: target });
    // Llamar a la función para manejar el evento
    handleChange(eventoPersonalizado);}
  };

  const handleImageRemota = async (event) => {
    event.preventDefault();
    const image = event.target.value;
    const response = await dispatch(postImageRemota(image));
    const imageUrl = response.payload.imageUrl
    console.log('response imagen', imageUrl);
    
    if(imageUrl){
        // Crear un elemento div simulado como target
        const target = document.createElement("div");
        target.name = "imagen"; // Puedes agregar propiedades al target si es necesario
        target.value = imageUrl;
        // Crear un evento personalizado con un target personalizado
        const eventoPersonalizado = new Event("eventoConTarget", {
          bubbles: true,
          cancelable: true,
        });
        // Agregar el target simulado al evento
        Object.defineProperty(eventoPersonalizado, "target", { value: target });
        // Llamar a la función para manejar el evento
        handleChange(eventoPersonalizado);}
  };

  const handleClose = () => {
    setSelectedObject(null);
  };

  return (
    <div className="stock">
      {!selectedObject &&<>
      <h1>Lista de Productos a Actualizar</h1>

       <ul> 
      {data.map((obj) => (
          <li key={obj.id} onClick={() => handleSelect(obj)} >
            <p>{obj.tipo} {obj.marca}</p> 
            <img
              src={obj.imagen}
              alt="Vista previa de la imagen"
              style={{ maxWidth: "100px", maxHeight: "auto" }}
            />
          </li>
        ))}
        </ul>
        </> 
}
      {selectedObject&&
       <div>
        <button onClick={handleClose}>X</button>
          <h2>Actualizar Producto: {selectedObject.tipo} {selectedObject.marca}</h2>

          <div className="field">
          <label>Marca</label>
        <p>{selectedObject.marca}</p>
        </div>

        <div className="field">
          <label>Tipo</label>
          <input
                type="text"
                name="tipo"
                value={selectedObject.tipo}
                onChange={(e) => handleChange(e)}
              />
        </div>

        <div className="field">
          <label>Precio</label>
          <input
                type="text"
                name="precio"
                value={selectedObject.precio}
                onChange={(e) => handleChange(e)}
              />
        </div>

        {selectedObject.categoria&&<div className="field">
          <label>Categoria</label>
        <p>{selectedObject.categoria}</p>
        </div>}

        <div className="field">
          <label>Decripcion</label>
          <textarea
          rows='4'
          cols='50'                
          type="text"
                name="descripcion"
                value={selectedObject.descripcion}
                onChange={(e) => handleChange(e)}
              />
        </div>

          <br />
         
          <div className="field">
        <label>Imagen </label>
        <input 
        type="file"
         className="form_style"
        accept="image/*" 
        onChange={handleImageLocal} 
        name="imagen"
        id="imagen"
        multiple
      />
         <input
          type="text"
          className="form_style"
          name="imageUrl"
          onChange={handleImageRemota}
          placeholder="URL de imagen"
        />


            <br />
            <img
              src={selectedObject.imagen}
              alt="Vista previa de la imagen"
              style={{ maxWidth: "300px", maxHeight: "300px" }}
            />
      </div>

          <button onClick={handleSave}>Guardar</button>

        </div>  
        }

    </div>
  );
}

export default updateProduct;