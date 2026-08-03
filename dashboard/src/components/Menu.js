import React , {useState} from "react";

import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu-container">
      <img src="logo.png" style={{width: "50px"}}/>

      <div className="menus">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>

          <li>
            <Link to="/orders">Orders</Link>
          </li>

          <li>
            <Link to="/holdings">Holdings</Link>
          </li>

          <li>
            <Link to="/positions">Positions</Link>
          </li>

          <li>
            <Link to="/funds">Funds</Link>
          </li>

          <li>
            <Link to="/apps">Apps</Link>
          </li>
        </ul>

        <hr />

        <div className="profile">
          {/* Avatar */}
          {/* Username */}
        </div>
      </div>
    </div>
  );
};

export default Menu;
