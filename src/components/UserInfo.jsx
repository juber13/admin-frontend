import React from 'react'
import { useSelector } from 'react-redux'

const UserInfo = () => {
    const {users , token} = useSelector(store => store.users);
    const capitalize = (str) => {
      return str
        ?.split(" ")
        .map((text) => text.charAt(0).toUpperCase() + text.slice(1))
        .join(" ");
    };

  return (
    <table className={`w-[90%] border shadow-md pb-3 `}>
    {users.length > 0 &&
      <thead className="">
        <tr className='border text-blue-500 font-medium'>
         <th className='border p-3 '>User ID</th>
          <th className='border p-3 '>Name</th>
          <th className='border p-3 '>Email</th>
          <th className='border p-3 '>Phone</th>
        </tr>
      </thead>
    }

      <tbody>
        {!users && (<th colSpan={4} className='text-sm text-center p-4'>No User yet</th>)}
        {users .map((user , index) => (
          <tr key={user._id} className={`text-center text-xs ${index % 2 === 0 && 'bg-gray-100'}`}>
             <td className='border p-3'>{user._id}</td>
            <td className='border p-3'>{capitalize(user.name)}</td>
            <td className='border p-3'>{user.email}</td>
             <td className='border p-3'>{user.phone}</td>
            {/* <td className='border p-2'>{capitalize(user.)}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserInfo