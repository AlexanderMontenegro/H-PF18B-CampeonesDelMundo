import React, { useEffect, useState } from 'react';
import '../../css/darkmode.css';

const DarkModeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button className="dark-mode-toggle" onClick={toggleTheme} data-theme={theme}>
      <img src="../iconos/darkmode.png" alt="Dark Mode Icon" className="icon" />
      <span className="text__d">{theme === 'light' ? 'Dark' : 'Light'}</span>
    </button>
  );
};

export default DarkModeToggle;
