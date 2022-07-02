import React from "react";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../images/header-logo.png";

function Header(props) {
  const { loggedIn, handleLogout } = props;
  const currentPath = useLocation().pathname;
  const linkTo = currentPath === "/signin" ? "/signup" : "/signin";
  const linkText = linkTo === "/signin" ? "Log In" : "Sign up";
  return loggedIn ? (
    <header className="header">
      <img src={headerLogo} alt="Across the U.S" className="header__image" />
      <p className="header__user">{props.user}</p>
      <Link to={"/signin"} className="header__link" onClick={handleLogout}>
        {"Log out"}
      </Link>
    </header>
  ) : (
    <header className="header">
      <img src={headerLogo} alt="Across the U.S" className="header__image" />
      <Link to={linkTo} className="header__link" onClick={handleLogout}>
        {linkText}
      </Link>
    </header>
  );
}

export default Header;
