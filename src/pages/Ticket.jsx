/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { ticketSchema } from '../schema/TicketSchema';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Ticket = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useSelector(store => store.users);

    const { values, handleBlur, handleChange, handleSubmit, touched, errors, resetForm } = useFormik({
        initialValues: {
            title: "",
            description: "",
            token
        },
        validateOnBlur: false,
        validateOnChange: true,
        validationSchema: ticketSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const result = await axios.post("https://admin-backend-abwu.onrender.com/api/ticket/raise-ticket",values);
                if (result.data.success) {
                    toast.success(result.data.message);
                    resetForm(); // Reset form fields after successful submission
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    toast.error(result.data.message || 'Failed to raise ticket');
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'An error occurred while raising the ticket');
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className="inputs p-6 w-full max-w-[80%] sm:max-w-sm shadow-md rounded-sm border">
                <h2 className='text-center text-xl text-blue-700 font-medium'>Raise Ticket!</h2>
                <form className='flex gap-3 flex-col' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor="title" className='text-sm font-medium'>Title</label>
                        <input
                            autoComplete="off"
                            name="title"
                            value={values.title}
                            placeholder='Title'
                            className='outline-none border p-4 py-2 rounded-md text-sm'
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.title && errors.title ? <p className='text-red-600 text-xs'>{errors.title}</p> : null}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="description" className='text-sm font-medium'>Description</label>
                        <textarea
                            autoComplete="off"
                            name="description"
                            value={values.description}
                            placeholder='Description'
                            className='outline-none border p-4 py-2 rounded-md text-sm'
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></textarea>
                        {touched.description && errors.description ? <p className='text-red-600 text-xs'>{errors.description}</p> : null}
                    </div>

                    <button className={`bg-blue-700 p-2 rounded-md text-white`} type='submit'>
                        {loading ? 'Submitting...' : 'Submit Ticket'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Ticket;
