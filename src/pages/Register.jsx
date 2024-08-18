import React, { useState } from 'react';
import { signUpSchema } from '../schema/SignupSchema'; // Ensure this schema is correctly defined
import { useFormik } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const initialState = {
        name: "",
        phone: "",
        email: "",
        password: "",
        role : ""
        
    };

    const navigate = useNavigate();

    const { handleChange, handleSubmit, errors, values, touched, handleBlur } = useFormik({
        initialValues: initialState,
        validateOnBlur: false,
        validateOnChange: true,
        validationSchema: signUpSchema,
        onSubmit: async (values, action) => {
            setLoading(true); // Set loading to true when submitting
            try {
                const response = await axios.post(
                  "https://admin-backend-abwu.onrender.com/api/user/register",
                  values
                ); // Ensure your API endpoint is correct
                toast.success(response.data.message); // Handle response data as needed
                action.resetForm(); // Reset form after successful submission
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            } catch (error) {
                toast.error(error.response.data.message)
                console.log(error.response.data.message); // Log any errors
            } finally {
                setLoading(false); // Reset loading state regardless of success or error
            }
        }
    });

    return (
      <div className='bg-white w-full h-[calc(100vh - 100px)]'>
        <div className='w-full h-screen flex items-center justify-center'>
          <div className='inputs p-6 w-full max-w-[80%] sm:max-w-sm shadow-md rounded-sm border'>
            <h2 className='text-center text-xl text-blue-700 font-medium'>
              Register here!
            </h2>
            <form className='flex gap-3 flex-col' onSubmit={handleSubmit}>
              <div className='flex flex-col'>
                <label
                  htmlFor='name'
                  className='text-sm text-black  font-medium'
                >
                  Name
                </label>
                <input
                  autoComplete='off'
                  name='name'
                  value={values.name}
                  placeholder='Name'
                  className='outline-none border p-4 py-2 rounded-md text-sm'
                  type='text'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name ? (
                  <p className='text-red-400 m-1 text-xs'>{errors.name}</p>
                ) : null}
              </div>

              <div className='flex flex-col'>
                <label
                  htmlFor='phone'
                  className='text-s text-black font-medium'
                >
                  Phone
                </label>
                <input
                  autoComplete='off'
                  name='phone'
                  value={values.phone}
                  placeholder='Phone'
                  className='outline-none border p-4 py-2 rounded-md text-sm'
                  type='tel'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.phone && errors.phone ? (
                  <p className='text-red-400 m-1 text-xs'>{errors.phone}</p>
                ) : null}
              </div>

              <div className='flex flex-col'>
                <label
                  htmlFor='email'
                  className='text-sm text-black  font-medium'
                >
                  Email
                </label>
                <input
                  autoComplete='off'
                  name='email'
                  value={values.email}
                  placeholder='Email'
                  className='outline-none border p-4 py-2 rounded-md text-sm'
                  type='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email ? (
                  <p className='text-red-400 m-1 text-xs'>{errors.email}</p>
                ) : null}
              </div>

              <div className='flex flex-col'>
                <label
                  htmlFor='password'
                  className='text-sm text-black  font-medium'
                >
                  Password
                </label>
                <input
                  autoComplete='off'
                  name='password'
                  value={values.password}
                  placeholder='Password'
                  className='outline-none border p-4 py-2 rounded-md text-sm'
                  type='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password ? (
                  <p className='text-red-400 m-1 text-xs'>{errors.password}</p>
                ) : null}
              </div>

              <div className='flex gap-4 text-black '>
                <div className='flex gap-1 items-center'>
                  <label className='text-sm' htmlFor='user'>
                    User
                  </label>
                  <input
                    type='radio'
                    name='role'
                    id='user'
                    value='user'
                    onChange={handleChange}
                  />
                </div>

                <div className='flex gap-1 items-center'>
                  <label className='text-sm ' htmlFor='agent'>
                    Agent
                  </label>
                  <input
                    type='radio'
                    name='role'
                    id='agent'
                    value='agent'
                    onChange={handleChange}
                  />
                </div>

                <div className='flex gap-1 items-center'>
                  <label className='text-sm' htmlFor='admin'>
                    Admin
                  </label>
                  <input
                    type='radio'
                    name='role'
                    id='admin'
                    value='admin'
                    onChange={handleChange}
                  />
                </div>

                {touched.role && errors.role ? (
                  <p className='text-red-400 m-1 text-xs'>{errors.role}</p>
                ) : null}
              </div>

              <button
                className={`bg-blue-700 p-2 rounded-md text-white`}
                type='submit'
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Register;
