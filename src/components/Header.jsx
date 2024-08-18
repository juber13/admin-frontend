/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbDeviceIpadMinus } from "react-icons/tb";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/userSlice.js";

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store?.users);

  const handleLogout = () => {
    dispatch(logoutUser(null));
  };

  return (
    <div className='sticky top-0 left-0 right-0 z-100 p-4 text-center text-lg flex bg-white text-gray-800 items-center justify-between  shadow-md'>
      {/* this is another comment */}
      <Link to='/'>
        <TbDeviceIpadMinus className='text-3xl' style={{ color: "blue" }} />
      </Link>
      <div className={`flex gap-2 `}>
        {token ? (
          <button
            onClick={handleLogout}
            className='border p-3 py-2 text-sm font-medium shadow-sm rounded-md cursor-pointer'
          >
            Logout
          </button>
        ) : (
          <Link to={"/login"}>
            <button className='border p-3 py-2 text-sm font-medium shadow-sm rounded-md cursor-pointer'>
              Login
            </button>
          </Link>
        )}
        <Link to={token ? "/raise-ticket" : "/register"}>
          <div className='border p-3 py-2 text-sm font-medium shadow-sm rounded-md cursor-pointer'>
            {token ? "Raise Ticket" : "Register"}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
