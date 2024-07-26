import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProductsByType } from "../../Redux/actions";
import "../../css/searchbar.css"; // Importa tu archivo CSS de estilos

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleSearchClick = () => {
    dispatch(searchProductsByType(searchTerm)); // Despacha la acción de búsqueda
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
      <button
        type="button"
        className="search-bar-button"
        onClick={handleSearchClick}
      >
        Buscar
      </button>
    </div>
  );
};

export default Searchbar;

