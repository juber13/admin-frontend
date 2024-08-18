/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";

import { useSelector, } from "react-redux";

import SideBar from "./SideBar";
import TicketInfo from "./TicketInfo";
import UserInfo from "./UserInfo";

const Content = () => {
  const { token , loading , toggle} = useSelector((store) => store.users);



  

  return (
    <div className='flex gap-2 w-full justify h-screen text-black'>
      <SideBar />
      <div
        className={`right-side flex flex-col gap-4 mt-3  w-full py-3 items-center ${
          !token ? "justify-center" : ""
        }`}
      >
        {loading && <p className=''>Loading Ticket...</p>}
        {(token && !toggle) ? <TicketInfo /> : <UserInfo/>}

        <Link to={token ? "/raise-ticket" : "/login"}>
          {!token && (
            <button className='bg-blue-700 p-3 px-6 text-sm font-semibold text-white rounded-md shadow-xl hover:shadow-none transition-all duration-200'>
              Raise a new Ticket
            </button>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Content;
