import React from "react";
import "../assets/main.css";
import { FaAlignJustify } from "react-icons/fa6";
import { MdOutlineModeNight } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import ProfileImage from "../assets/images/profile.png";

export default function Header({ toggleSidebar }) {
  return (
    <div className="header_body">
      <div className="header_main">
        <div className="header_left">
           <FaAlignJustify
            size={18}
            color="green"
            className="menu-icon"
            onClick={toggleSidebar}
          />
        </div>
        <div className="header_right">
          <MdOutlineModeNight size={20} color="green" />
          <IoIosNotificationsOutline size={20}  color="green"/>
          <div className="header_profile">
            <img src={ProfileImage} alt="profile" />
          </div>
        </div>
      </div>
    </div>
  );
}
