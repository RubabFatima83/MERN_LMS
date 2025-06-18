import React from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../../components/Home/Navbar'

const SuccessPage = () => {
    useEffect(() => {
        toast.success("Payment successful! Subscription updated.");
    }, []);

    return (
        <>
            <Navbar />
            <div className="h-screen flex items-center justify-center bg-green-100">
                <h2 className="text-3xl font-bold text-green-800">Thank you! Your subscription was successful.</h2>
            </div>
        </>
    );
};

export default SuccessPage;
