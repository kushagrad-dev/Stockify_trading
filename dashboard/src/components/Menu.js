import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] =
    useState(false);

  const [user, setUser] = useState({
    name: "User",
    email: "",
  });

  /*
   * Load user saved during login/signup.
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("stockifyUser");

    if (!storedUser) {
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      const name =
        parsedUser?.name ||
        parsedUser?.username ||
        parsedUser?.fullName ||
        "";

      const email = parsedUser?.email || "";

      setUser({
        name: name || "User",
        email,
      });
    } catch (error) {
      console.error("Unable to read stored user:", error);
    }
  }, []);

  /*
   * Determine active menu item.
   */
  const getActiveMenu = () => {
    switch (location.pathname) {
      case "/":
        return 0;

      case "/orders":
        return 1;

      case "/holdings":
        return 2;

      case "/positions":
        return 3;

      case "/funds":
        return 4;

      case "/apps":
        return 6;

      default:
        return 0;
    }
  };

  const selectedMenu = getActiveMenu();

  /*
   * Open / close profile popup.
   */
  const handleProfileClick = () => {
    setIsProfileDropdownOpen((current) => !current);
  };

  const displayName = user.name || "User";

  /*
   * Generate initials.
   */
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">

      {/* LOGO */}
      <img
        src="/logo.png"
        alt="Stockify"
        style={{ width: "50px" }}
      />

      <div className="menus">

        {/* NAVIGATION */}
        <ul>

          {/* DASHBOARD */}
          <li>
            <Link
              to="/"
              style={{ textDecoration: "none" }}
            >
              <p
                className={
                  selectedMenu === 0
                    ? activeMenuClass
                    : menuClass
                }
              >
                Dashboard
              </p>
            </Link>
          </li>

          {/* ORDERS */}
          <li>
            <Link
              to="/orders"
              style={{ textDecoration: "none" }}
            >
              <p
                className={
                  selectedMenu === 1
                    ? activeMenuClass
                    : menuClass
                }
              >
                Orders
              </p>
            </Link>
          </li>

          {/* HOLDINGS */}
          <li>
            <Link
              to="/holdings"
              style={{ textDecoration: "none" }}
            >
              <p
                className={
                  selectedMenu === 2
                    ? activeMenuClass
                    : menuClass
                }
              >
                Holdings
              </p>
            </Link>
          </li>

          {/* POSITIONS */}
          <li>
            <Link
              to="/positions"
              style={{ textDecoration: "none" }}
            >
              <p
                className={
                  selectedMenu === 3
                    ? activeMenuClass
                    : menuClass
                }
              >
                Positions
              </p>
            </Link>
          </li>

          {/* FUNDS */}
          <li>
            <Link
              to="/funds"
              style={{ textDecoration: "none" }}
            >
              <p
                className={
                  selectedMenu === 4
                    ? activeMenuClass
                    : menuClass
                }
              >
                Funds
              </p>
            </Link>
          </li>

          {/* APPS */}
          <li>
            <Link
              to="/apps"
              style={{ textDecoration: "none" }}
            >
              <p
                className={
                  selectedMenu === 6
                    ? activeMenuClass
                    : menuClass
                }
              >
                Apps
              </p>
            </Link>
          </li>

        </ul>

        <hr />

        {/* PROFILE */}
        <div className="profile-wrapper">

          <div
            className="profile"
            onClick={handleProfileClick}
            title={user.email || displayName}
          >

            {/* PROFILE AVATAR */}
            <div className="avatar">
              {initials || "U"}
            </div>

            {/* PROFILE NAME */}
            <p className="username">
              {displayName}
            </p>

            {/* ARROW */}
            <span className="profile-arrow">
              {isProfileDropdownOpen ? "▲" : "▼"}
            </span>

          </div>

          {/* PROFILE DROPDOWN */}
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">

              {/* HEADER */}
              <div className="profile-dropdown-header">

                <div className="profile-dropdown-avatar">
                  {initials || "U"}
                </div>

                <div className="profile-dropdown-user">

                  <strong>
                    {displayName}
                  </strong>

                  <span>
                    {user.email || "No email available"}
                  </span>

                </div>

              </div>

              {/* DIVIDER */}
              <div className="profile-dropdown-divider" />

              {/* ACCOUNT STATUS */}
              <div className="profile-dropdown-account">

                <span className="profile-status-dot" />

                <span>
                  Account Active
                </span>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Menu;