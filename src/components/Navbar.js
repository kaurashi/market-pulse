import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MarketPulse</div>

    
      <NavLink to="/">Dashboard</NavLink>
     <NavLink to="/market">Market</NavLink>
     <NavLink to="/favorites">Favorites</NavLink>
     <NavLink to="/profile">Profile</NavLink>
      
      <div className="navbar-controls">
        <input
          type="text"
          placeholder="Search coin..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="navbar-search"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="navbar-sort"
        >
          <option value="">Sort By</option>
          <option value="price">Prices</option>
          <option value="change">24hr Changes</option>
          <option value="market_cap">Market Capital</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
