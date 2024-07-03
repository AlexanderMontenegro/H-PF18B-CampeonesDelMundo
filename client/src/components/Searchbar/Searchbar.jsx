import React, { useState} from "react";
import "../../css/searchbar.css"; // Importa tu archivo CSS de estilos

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Llama a la función de búsqueda pasada como prop
  };
  
  

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Buscar..."
        className="search-bar-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;