import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProductsByType } from "../../Redux/actions";
import "../../css/searchbar.css"; // Importa tu archivo CSS de estilos

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    dispatch(searchProductsByType(term)); // Despacha la acción de búsqueda
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Buscar por tipo de producto..."
        className="search-bar-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Filter/>
    </div>
  );
};

export default SearchBar;