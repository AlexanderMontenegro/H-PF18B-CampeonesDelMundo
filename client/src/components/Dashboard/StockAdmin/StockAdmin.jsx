import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function StockAdmin() {

  const arrayProduct = useSelector(state=>state.allProducts);
console.log(arrayProduct)
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

  const handleSave = () => {
    setData(data.map(obj => (obj.id === selectedObject.id ? selectedObject : obj)));
    setSelectedObject(null);
  };

  const handleTallesChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...selectedObject.talles];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setSelectedObject({
      ...selectedObject,
      talles: updatedItems,
    });
  };

  const handleStockChange = (index, e) => {
    const { name} = e.target;
    const value = parseInt(e.target.value, 10)
    const updatedItems = [...selectedObject.talles];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setSelectedObject({
      ...selectedObject,
      talles: updatedItems,
    });
  };
  return (
    <div>
            <h1>Lista de Productos</h1>
      <ul>
        {data.map(obj => (
          <li key={obj.id} onClick={() => handleSelect(obj)}>
            {obj.tipo} {obj.marca}
          </li>
        ))}
      </ul>

      {selectedObject && (
        <div>
          <h2>Modificar Stock</h2>
{/*           <label>
            tipo:
            <input
              type="text"
              name="tipo"
              value={selectedObject.tipo}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Descripción:
            <input
              type="text"
              name="description"
              value={selectedObject.description}
              onChange={handleChange}
            />
          </label> */}
          <br />
          <h3>Talles</h3>
          {selectedObject.talles.map((item, index) => (
            <div key={item.talle}>
              <input
                type="text"
                name="talle"
                value={item.talle}
                onChange={(e) => handleTallesChange(index, e)}
              />
                <input
                type="number"
                name="stock"
                value={item.stock}
                onChange={(e) => handleStockChange(index, e)}
              />
              {console.log('dfdf',selectedObject)}
              </div>
          ))}

          <button onClick={handleSave}>Guardar</button>
        </div>
      )}
    </div>
  )
}

export default StockAdmin
