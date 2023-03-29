import React from "react";

import { MdHome, MdExitToApp } from "react-icons/md";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { log_out } from "../../redux/actions/authAction";

import "./_sidebar.scss";

const Sidebar = ({ isSidebar, toggleSidebar }) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(log_out());
  };

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <nav
      className={isSidebar ? "sidebar open" : "sidebar"}
      onClick={() => toggleSidebar(false)}
    >
      <li onClick={goHome}>
        <MdHome size={23} />
        <span>Home</span>
      </li>

      <hr />
      <li onClick={handleLogOut}>
        <MdExitToApp size={23} />
        <span>Log out</span>
      </li>
      <hr />
    </nav>
  );
};

export default Sidebar;
