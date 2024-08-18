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
    <table className={`w-[90%] border shadow-md pb-3 ${token ? "block" : "hidden"}`}>
      <thead className=''>
        <tr className='border text-red-500'>
         <th className='border p-3 font-medium text-red-400'>User ID</th>
          <th className='border p-3 font-medium'>Name</th>
          <th className='border p-3 font-medium'>Email</th>
          <th className='border p-3 font-medium'>Phone</th>
        </tr>
      </thead>

      <tbody>
        {users.length <= 0 && (
          <th colSpan={4} className='text-sm text-center p-4'>No User yet</th>)}
        {users .map((user) => (
          <tr key={user._id} className='text-center text-xs'>
             <td className='border p-2'>{user._id}</td>
            <td className='border p-2'>{capitalize(user.name)}</td>
            <td className='border p-2'>{user.email}</td>
             <td className='border p-2'>{user.phone}</td>
            {/* <td className='border p-2'>{capitalize(user.)}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserInfo