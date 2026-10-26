import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1>Chesley Guo</h1>
            <span>Frontend & AI Developer</span>
          </div>

          <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <li><a href="#home">Home</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="navbar-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌞' : '🌙'}
            </button>

            <button
              className="menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;