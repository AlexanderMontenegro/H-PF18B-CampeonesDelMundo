import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByProducto, sort } from "../../Redux/actions";
import "../../css/filter.css";

export const Filter = () => {
  const dispatch = useDispatch();
  const { productos } = useSelector((state) => state);

  // Obtener marcas únicas
  const uniqueProductos = productos.reduce((acc, current) => {
    if (!acc.find(item => item.tipo === current.tipo)) {
      acc.push(current);
    }
    return acc;
  }, []);

  const handleFilterChange = (e) => {
    const { value } = e.target;
    if (value !== "none") {
      dispatch(filterByProducto(value));
    } else {
      dispatch(filterByProducto("none"));
    }
  };

  const handleOrderChange = (e) => {
    const { value } = e.target;
    if (value !== "none") {
      dispatch(sort(value));
    } else {
      dispatch(sort("none"));
    }
  };

  return (
    <div className="product-filter">
      <div className="filter-controls">
        <div className="filter-control">
          <h4>Filtro</h4>
          <select name="producto" id="productFilter" onChange={handleFilterChange}>
            <option value="none">None</option>
            {uniqueProductos.map((producto) => (
              <option value={producto.tipo} key={producto.id}>
                {producto.tipo}
              </option>
            ))}
          </select>
        </div>
        <div className="ButtonDiv">
          <button onClick={handleFilterChange}>Filtrar</button>
        </div>
        <div className="filter-control">
          <h4>Ordenar</h4>
          <select name="sort" onChange={handleOrderChange}>
            <option value="none">None</option>
            <option value="ratingAsc">precio menor a mayor</option>
            <option value="ratingDesc">precio mayor a menor</option>
          </select>
        </div>
        <div className="ButtonDiv">
          <button onClick={handleOrderChange}>Ordenar</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;