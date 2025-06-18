import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import MentorLayout from '../../components/mentor/MentorLayout';

const MentorDashboard = () => {
  // const navigate = useNavigate();

  return (
    <MentorLayout>
      <h1 className="text-3xl font-semibold text-[#65a0ff] mb-6">Welcome, Mentor!</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map(({ title, description, path }) => (
          <div
            key={title}
            className="bg-[#012465] shadow-lg rounded-xl p-6 border-l-8 border-[#65a0ff]
                  hover:scale-[1.03] transition-transform duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate(path)}
          >
            <h3 className="text-2xl font-semibold text-[#e0e7ff] mb-3">{title}</h3>
            <p className="text-[#e0e7ff]">{description}</p>
          </div>
        ))}
      </div> */}
      <Navigate to="/mentor/my-courses" replace />
    </MentorLayout>
  );
};

export default MentorDashboard;
