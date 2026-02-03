import React,{useState} from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import MainGrid from "../components/MainGrid";
import { Outlet } from "react-router-dom";
import "../assets/main.css";

export default function Dashboard({ role }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="main-container">
      <Navbar role={role}  isOpen={isSidebarOpen} />
      <div className="main-content">
        <Header  toggleSidebar={toggleSidebar}/>
        <div className="content-area">
          {/* Page content goes here */}
          {/* <h2>Dashboard Overview</h2>
           <MainGrid></MainGrid> */}
          <Outlet></Outlet>

        </div>
      </div>
    </div>
  );
}
