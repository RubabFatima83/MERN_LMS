import React from 'react'
import img from '../assets/favicon.png'
import { Navigate, useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

    return (
        <div className='flex flex-col items-center mt-39 px-4 text-center'>
            <img src={img} alt="img" className='w-36 h-30 mb-6 rounded-full' />
            <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey Students</h1>
            <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to StudentSphere</h2>
            <p className='mb-8 max-w-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat ullam facere est et fuga, quas hic! Tempora impedit quaerat fugiat perspiciatis laborum voluptatum, suscipit iste. Nisi quisquam laboriosam reprehenderit iusto natus consectetur dolores numquam?</p>
            <button onClick={()=> navigate('/signup')}
            className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all cursor-pointer'>Get Started</button>
        </div>
    )
}

export default Header
