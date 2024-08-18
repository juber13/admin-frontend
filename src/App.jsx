/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// components imports
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Content from "./components/Content";
import Ticket from "./pages/Ticket";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path='/' element={<Content />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/raise-ticket' element={<Ticket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
