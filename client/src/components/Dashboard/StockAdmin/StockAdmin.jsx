import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStock } from "../../../Redux/actions";
import { useNavigate } from "react-router-dom";
import Modal from '..//..//Modal/Modal';
import Swal from "sweetalert2";
import "../../../css/controlstock.css";

function StockAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const arrayProduct = useSelector((state) => state.allProducts);
  const [data, setData] = useState(arrayProduct);
  const [selectedObject, setSelectedObject] = useState(null);

  const handleSelect = (obj) => {
    setSelectedObject(obj);
  };

  //Guardar
  const handleSave = async ()  => {
console.log(selectedObject.talles)
const response=await dispatch(updateStock(selectedObject.id,selectedObject.talles));
if(response.payload.data)
{
  Swal.fire({
    icon: "success",
    title: 'Stock Actualizado',
    text: "",
    timer: 3000,
  }).then(() => {
    // Redirigir después de que la alerta se cierre
    navigate("/dashboard/"); // Cambia la URL al destino
    window.location.reload();
  });
}

  };

  const handleStockChange = (index, e) => {
    const { name } = e.target;
    const value = parseInt(e.target.value, 10);
    const updatedItems = [...selectedObject.talles];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setSelectedObject({
      ...selectedObject,
      talles: updatedItems,
    });
  };

  const handleCloseModal = () => {
    setSelectedObject(null);
  };
  
  return (
    <div className="stock">
      <h1>Lista de Productos a Actualizar Stock</h1>
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

      {selectedObject &&<Modal>        
        <div  className="modificar__stock"  >
        <button onClick={handleCloseModal}>X</button>
          <h2>Modificar Stock: {selectedObject.tipo} {selectedObject.marca}</h2>
          <img
              src={selectedObject.imagen}
              alt="Vista previa de la imagen"
              style={{ maxWidth: "150px", maxHeight: "auto" }}
            />
          <br />
         
          <div  className="modificables"  >
          {selectedObject.talles.map((item, index) => (
            <div className="datos" key={item.talle}>
              <p>Talle: {item.talle}</p>
              <input
                type="number"
                name="stock"
                value={item.stock}
                onChange={(e) => handleStockChange(index, e)}
              />
            </div>))}
          </div>

          <button onClick={handleSave}>Guardar</button>
          
        </div> 
      </Modal>
      }
    </div>
  );
}

export default StockAdmin;
