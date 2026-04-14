import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Form() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [message, setMessage] = useState('')

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    setMessage('Form submitted successfully!');
    setTimeout(() =>{
      setMessage('')
    }, 3000)
    reset();
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Registration Form</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="fullName"
            {...register('fullName', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Full name must be at least 2 characters' },
              pattern: { value: /^[A-Za-z\s]+$/, message: 'Full name should only contain letters and spaces' }
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (<p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>)}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Please enter a valid email address' }
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your email"
          />
          {errors.email && (<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>)}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            {...register('phoneNumber', {
              required: 'Phone number is required',
              pattern: { value: /^[\+]?[1-9][\d]{0,15}$/, message: 'Please enter a valid phone number' },
              minLength: { value: 10, message: 'Phone number must be at least 10 digits' }
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && (<p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>)}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters long' },
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your password"
          />
          {errors.password && (<p className="mt-1 text-sm text-red-600">{errors.password.message}</p>)}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md">Submit</button>
        {message && <p className='text-xl text-green-500 text-center'>{message}</p>}
      </form>
    </div>
  );
}

export default Form;