import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByProducto, filterByCategoria, filterByMarca, sort } from "../../Redux/actions";
import "../../css/filter.css";

export const Filter = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const  productos = useSelector((state) => state.productos);

  // Obtener tipos únicos
  const uniqueProductos = productos.reduce((acc, current) => {
    if (!acc.find((item) => item.tipo === current.tipo)) {
      acc.push(current);
    }
    return acc;
  }, []);

  // Obtener categorias únicas
  const uniqueCategorias = productos.reduce((acc, current) => {
    if (!acc.find((item) => item.categoria === current.categoria)) {
      acc.push(current);
    }
    return acc;
  }, []);

  // Obtener marcas únicas
  const uniqueMarcas = productos.reduce((acc, current) => {
    if (!acc.find((item) => item.marca === current.marca)) {
      acc.push(current);
    }
    return acc;
  }, []);

  const handleProductoChange = (e) => {
    const { value } = e.target;
    if (value !== "none") {
      dispatch(filterByProducto(value));
    } else {
      dispatch(filterByProducto("none"));
    }
    onFilterChange();
  };

  const handleCategoriaChange = (e) => {
    const { value } = e.target;
    if (value !== "none") {
      dispatch(filterByCategoria(value));
    } else {
      dispatch(filterByCategoria("none"));
    }
    onFilterChange();
  };

  const handleMarcaChange = (e) => {
    const { value } = e.target;
    if (value !== "none") {
      dispatch(filterByMarca(value));
    } else {
      dispatch(filterByMarca("none"));
    }
  };

  const handleOrderChange = (e) => {
    const { value } = e.target;
    if (value !== "none") {
      dispatch(sort(value));
    } else {
      dispatch(sort("none"));
    }
    onFilterChange();
  };

  return (
    <div className="product-filter">
      <div className="filter-controls">
        
        <div className="filter-control">
          <h4 className="h4">TIPO</h4>
          <select
            name="producto"
            id="productFilter"
            onChange={handleProductoChange}
          >
            <option value="none"> </option>
            {uniqueProductos.map((producto) => (
              <option value={producto.tipo} key={producto.id}>
                {producto.tipo}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-control">
          <h4 className="h4">CATEGORIA</h4>
          <select
            name="categoria"
            id="categoryFilter"
            onChange={handleCategoriaChange}
          >
            <option value="none"> </option>
            {uniqueCategorias.map((producto) => (
              <option value={producto.categoria} key={producto.id}>
                {producto.categoria}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-control">
          <h4 className="h4">MARCA</h4>
          <select
            name="marca"
            id="brandFilter"
            onChange={handleMarcaChange}
          >
            <option value="none"> </option>
            {uniqueMarcas.map((producto) => (
              <option value={producto.marca} key={producto.id}>
                {producto.marca}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-control">
          <h4 className="h4">PRECIOS</h4>
          <select name="sort" onChange={handleOrderChange}>
            <option value="none"> </option>
            <option value="ratingAsc">precio menor a mayor</option>
            <option value="ratingDesc">precio mayor a menor</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;