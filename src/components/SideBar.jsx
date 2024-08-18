import React, {useState , useEffect} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers , setLoading , setToggle } from "../store/userSlice";
const SideBar = () => {
  const {role} = useSelector(store => store.users);
  const [isTrue, setIsTrue] = useState(false);
  const {error , setError} = useState("");
  const dispatch = useDispatch();

// functions
  const getUsers = async () => {
    dispatch(setLoading(false)); 
    try {
      const res = await axios.get("https://admin-backend-abwu.onrender.com/api/user/user-list");
      dispatch(setUsers(res.data)); 
      dispatch(setToggle(true)); 
      dispatch(setLoading(false)); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={`left-side w-[200px] border-r-2 p-3 h-[calc(100vh - 2rem)]  ${["admin" , "agent"].includes(role) ? "block" : "hidden"}`} style={{ boxSizing: "border-box" }}>
        <ul className='m-0 p-0 flex flex-col gap-2 cursor-pointer text-sm '>
          <li className='hover:bg-gray-600 text-sm p-2 font-medium border px-4 rounded-md' onClick={() => dispatch(setToggle(false))}>Tickets</li>
          <li className='px-4 hover:bg-gray-600 p-2 font-medium border rounded-md' onClick={getUsers}> Customers</li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
