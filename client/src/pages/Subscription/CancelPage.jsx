import React from 'react';
import Navbar from '../../components/Home/Navbar'

const CancelPage = () => {
    return (
        <>
            <Navbar />
            <div className="h-screen flex items-center justify-center bg-red-100">
                <h2 className="text-3xl font-bold text-red-800">Payment was cancelled. Please try again.</h2>
            </div>
        </>
    );
};

export default CancelPage;
