/* eslint-disable no-unused-vars */
import React , {useState , useEffect} from 'react'

import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { BsThreeDots } from "react-icons/bs";

import { setUserTickets , setLoading } from '../store/userSlice';

import axios from 'axios';
function TicketInfo() {
 const { tickets, token, role, users } = useSelector((store) => store.users);
 
  const [error, setError] = useState("");
  const [openEditId, setOpenEditId] = useState(null);
  const [isTrue, setIsTrue] = useState(false);
  const dispatch = useDispatch();



  const capitalize = (str) => {
    return str
      ?.split(" ")
      .map((text) => text.charAt(0).toUpperCase() + text.slice(1))
      .join(" ");
  };

  const updateStatus = async (e, ticketId) => {
    let status = e.target.innerText;
    setLoading(true);
    try {
      await axios.post(
        "https://admin-backend-abwu.onrender.com/api/ticket/update-status",
        { status, ticketId }
      );
      setLoading(false);
      setOpenEditId(false);
      toast.success("Ticket updated successfully");
    } catch (err) {
      console.log(err.message);
    }
  };

  const getAllTicket = async () => {
    // setLoading(true);
    dispatch(setLoading(false)); 

    try {
      const res = await axios.get(
        `https://admin-backend-abwu.onrender.com/api/ticket/getAll-ticket?id=${token}`
      );
      console.log(res);
      dispatch(setUserTickets(res.data));
      dispatch(setLoading(false));
    } catch (err) {
      setError("Failed to fetch tickets. Please try again later.");
    } finally {
        dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (token) getAllTicket();
  }, [token]);

  return (
    <table className='w-[90%] border shadow-md pb-3'>
      <thead className=''>
        <tr className='border text-blue-500'>
          {["agent", "admin"].includes(role) && (
            <>
              <th className='border p-3 font-medium'>User ID</th>
            </>
          )}
          <th className='border p-3 font-medium'>Ticket ID</th>
          <th className='border p-3 font-medium'>Title</th>
          <th className='border p-3 font-medium'>Description</th>
          <th className='border p-3 font-medium'> Status</th>
        </tr>
      </thead>

      <tbody>
        {!tickets && (
          <tr colSpan={4} className='text-sm text-center p-4'>
            No ticket raised yet
          </tr>
        )}
        {(isTrue ? users : tickets).map((ticket, index) => (
          <tr
            key={ticket._id}
            className={`text-center text-xs ${
              index % 2 === 0 && "bg-gray-100"
            }`}
          >
            {["agent", "admin"].includes(role) && (
              <td className='border p-2'>{ticket.raisedBy}</td>
            )}
            <td className='border p-2'>{ticket._id}</td>
            <td className='border p-2'>{capitalize(ticket.title)}</td>
            <td className='border p-2'>{capitalize(ticket.description)}</td>
            <td className='border p-2 flex  relative items-center justify-center gap-2'>
              <span
                className={`text-sm text-normal text-gray ${
                  ticket.status === "ACCEPTED"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {ticket.status}
              </span>
              {["agent", "admin"].includes(role) && (
                <span>
                  <BsThreeDots
                    className='text-xl cursor-pointer'
                    onClick={() =>
                      setOpenEditId(
                        openEditId === ticket._id ? null : ticket._id
                      )
                    }
                  />
                  <ul
                    className={` absolute rounded-md overflow-hidden text-xs shadow-md z-10 text-gray-700 bg-white flex flex-col 
                            ${openEditId === ticket._id ? "block" : "hidden"}`}
                    onClick={(e) => updateStatus(e, ticket._id)}
                    style={{ top: "", right: "" }}
                  >
                    <li className='hover:bg-gray-200 p-1 cursor-pointer hover:text-green-900 rounded-sm'>
                      PENDING{" "}
                    </li>
                    <li className='hover:bg-gray-200 p-1 cursor-pointer hover:text-green-900 rounded-sm'>
                      ACCEPTED
                    </li>
                    <li className='hover:bg-gray-200 p-1 cursor-pointer hover:text-green-900 rounded-sm'>
                      {" "}
                      REJECTED
                    </li>
                  </ul>
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TicketInfo