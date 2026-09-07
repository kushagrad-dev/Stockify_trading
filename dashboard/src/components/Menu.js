import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="stockify-menu">
      <Link to="/" className="stockify-menu-link">
        Dashboard
      </Link>

      <Link to="/watchlist" className="stockify-menu-link">
        Watchlist
      </Link>

      <Link to="/orders" className="stockify-menu-link">
        Orders
      </Link>

      <Link to="/holdings" className="stockify-menu-link">
        Holdings
      </Link>

      <Link to="/positions" className="stockify-menu-link">
        Positions
      </Link>

      <Link to="/funds" className="stockify-menu-link">
        Funds
      </Link>

      <Link to="/apps" className="stockify-menu-link">
        Apps
      </Link>
    </nav>
  );
};

export default Menu;