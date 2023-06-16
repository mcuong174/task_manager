import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faBell, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

import Logo from "../../assets/react-2.svg";
import "./HeaderStyles.scss";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={Logo} alt="logo" />
        React
      </div>
      <div className="header-menu">
        <div className="header-menu">
          <FontAwesomeIcon icon={faBell} />

          <FontAwesomeIcon icon={faCommentDots} />
        </div>
        <div className="user">
          <FontAwesomeIcon icon={faUser} />

          <div className="user-option">
            <Link to="/">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              Login
            </Link>
            <Link to="/register">
              <FontAwesomeIcon icon={faUserPlus} />
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
