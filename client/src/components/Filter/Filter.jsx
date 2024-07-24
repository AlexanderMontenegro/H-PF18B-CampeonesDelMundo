import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByProducto, filterByCategoria, filterByMarca, sort } from "../../Redux/actions";
import "../../css/filter.css";

export const Filter = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.allProducts);

  const [uniqueProductos, setUniqueProductos] = useState([]);
  const [uniqueCategorias, setUniqueCategorias] = useState([]);
  const [uniqueMarcas, setUniqueMarcas] = useState([]);

  useEffect(() => {
    const productosUnicos = [...new Set(productos.map((prod) => prod.tipo))];
    setUniqueProductos(productosUnicos);

    const categoriasUnicas = [...new Set(productos.map((prod) => prod.categoria))];
    setUniqueCategorias(categoriasUnicas);

    const marcasUnicas = [...new Set(productos.map((prod) => prod.marca))];
    setUniqueMarcas(marcasUnicas);
  }, [productos]);

  const handleProductoChange = (e) => {
    const { value } = e.target;
    dispatch(filterByProducto(value));
    onFilterChange();
  };

  const handleCategoriaChange = (e) => {
    const { value } = e.target;
    dispatch(filterByCategoria(value));
    onFilterChange();
  };

  const handleMarcaChange = (e) => {
    const { value } = e.target;
    dispatch(filterByMarca(value));
    onFilterChange();
  };

  const handleOrderChange = (e) => {
    const { value } = e.target;
    dispatch(sort(value));
    onFilterChange();
  };

  return (
    <div className="product-filter">
      <div className="filter-controls">
        <div className="filter-control">
          <h4 className="h4">TIPO</h4>
          <select name="producto" id="productFilter" onChange={handleProductoChange}>
            <option value="none"> </option>
            {uniqueProductos.map((tipo, index) => (
              <option value={tipo} key={index}>{tipo}</option>
            ))}
          </select>
        </div>
        <div className="filter-control">
          <h4 className="h4">CATEGORIA</h4>
          <select name="categoria" id="categoryFilter" onChange={handleCategoriaChange}>
            <option value="none"> </option>
            {uniqueCategorias.map((categoria, index) => (
              <option value={categoria} key={index}>{categoria}</option>
            ))}
          </select>
        </div>
        <div className="filter-control">
          <h4 className="h4">MARCA</h4>
          <select name="marca" id="brandFilter" onChange={handleMarcaChange}>
            <option value="none"> </option>
            {uniqueMarcas.map((marca, index) => (
              <option value={marca} key={index}>{marca}</option>
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
