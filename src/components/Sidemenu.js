import React, { useState, useEffect } from "react";
import logo from "../../src/images/logo-icon.svg";
import bars from "../../src/images/sidebar-bars-icon.png";
import people from "../../src/images/sidebar-people-icon.png";
import "./../App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const Sidemenu = () => {
   return (
    <div className="sidenav">
    <span className="logo">
      <img src={logo} alt="" />
    </span>
    <span className="list-item">
      <Link to="/">
        {" "}
        <img src={bars} alt="" />
      </Link>
    </span>
    <span className="list-item">
    <img src={people} alt="" />
  
    </span>
  </div>

  );
};

export default Sidemenu;
