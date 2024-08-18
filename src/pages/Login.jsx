/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { TbPassword, TbRouteAltLeft } from 'react-icons/tb';
import { loginSchema } from '../schema/LoginSchema';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setUserInfo} from '../store/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const initialState = {
        email: "aman@gmail.com",
        password: "aman123",
    };

    const { handleChange, handleSubmit, errors, values, touched } = useFormik({
        initialValues: initialState,
        validateOnBlur: false,
        validateOnChange: true,
        validationSchema: loginSchema,
        onSubmit: async (values, action) => {
            setLoading(true);
            try {
                console.log(values);
                const response = await axios.post(
                  "https://admin-backend-abwu.onrender.com/api/user/login",
                  values
                ); 
                dispatch(setUserInfo(response.data));
                toast.success(response.data.message);
                action.resetForm();
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } catch (error) {
                const errorMessage = error.response ? error.response.data.message : "An error occurred";
                toast.error(errorMessage);
                console.log(errorMessage); // Log any errors
            } finally {
                setLoading(false); 
            }
        }
    });

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <div className="inputs border p-6 shadow-md rounded-md w-full md:max-w-sm max-w-[80%]">
                <h2 className='text-center text-xl font-medium text-blue-700'>Login here</h2>
                <form className='flex gap-3 flex-col' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <input
                            autoComplete="off"
                            placeholder='Email'
                            onChange={handleChange}
                            name='email'
                            className='outline-none border p-4 py-2 rounded-md text-sm'
                            type="text"
                            value={values.email}
                        />
                        {touched.email && errors.email ? <p className='text-red-400 text-xs'>{errors.email}</p> : null}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="password">Password</label>
                        <input
                            autoComplete="off"
                            placeholder='Password'
                            onChange={handleChange}
                            name='password'
                            className='outline-none border p-4 py-2 rounded-md text-sm'
                            type="password"
                            value={values.password}
                        />
                        {touched.password && errors.password ? <p className='text-red-400 text-xs'>{errors.password}</p> : null}
                    </div>

                   

                    <button
                        className='bg-blue-700 p-2 rounded-md text-white'
                        type='submit'
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
