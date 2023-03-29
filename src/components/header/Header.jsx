import React, { useState } from "react";

import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import "./_header.scss";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const onSubmitHandle = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  };
  return (
    <div className='border  border-dark header'>
      <FaBars
        className='header_menu'
        size={26}
        onClick={() => toggleSidebar()}
      />
      <img
        src='https://pngimg.com/uploads/youtube/youtube_PNG2.png'
        alt=''
        className='header_logo'
      />
      <form onSubmit={onSubmitHandle}>
        <input
          type='text'
          placeholder='Search'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit'>
          <AiOutlineSearch size={22} />
        </button>
      </form>
      <div className='header_icons'>
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img
          src='https://cdn-icons-png.flaticon.com/512/147/147144.png?w=360'
          alt='avatar'
        />
      </div>
    </div>
  );
};

export default Header;
