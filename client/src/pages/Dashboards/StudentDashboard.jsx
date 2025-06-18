import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import StudentLayout from '../../components/student/StudentLayout'


const StudentDashboard = () => {
  return (
    <StudentLayout>
      <Navigate to={'/student/courses'}></Navigate>
    </StudentLayout>
    // <StudentLayout>
    // <div className="min-h-screen flex bg-[#0a1a40] text-gray-100">

    //   {/* Main Content */}
    //   <main className="flex-1 px-10 bg-[#0a1a40] min-h-screen overflow-auto">
    //     {/* pt-16 to avoid navbar overlap */}
    //     <h1 className="text-3xl md:text-4xl font-extrabold text-[#65a0ff] mb-8 tracking-wide">
    //       Welcome, Student!
    //     </h1>

    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
    //       {/* Cards */}
    //       {[
    //         {
    //           title: 'Courses',
    //           content: (
    //             <>
    //               You are enrolled in <span className="font-bold">5</span> courses.
    //             </>
    //           ),
    //         },
    //         {
    //           title: 'Assignments',
    //           content: (
    //             <>
    //               You have <span className="font-bold">2</span> pending assignments.
    //             </>
    //           ),
    //         },
    //         {
    //           title: 'Grades',
    //           content: (
    //             <>
    //               Your latest grade: <span className="font-bold">A-</span> in JavaScript.
    //             </>
    //           ),
    //         },
    //         {
    //           title: 'Announcements',
    //           content: (
    //             <>
    //               New semester starts on <span className="font-bold">1st June</span>.
    //             </>
    //           ),
    //         },
    //       ].map(({ title, content }) => (
    //         <div
    //           key={title}
    //           className="bg-[#012465] shadow-lg rounded-xl p-6 border-l-8 border-[#65a0ff]
    //               hover:scale-[1.03] transition-transform duration-300 ease-in-out cursor-pointer"
    //         >
    //           <h2 className="text-2xl font-semibold text-[#e0e7ff] mb-3">{title}</h2>
    //           <p className="text-[#b0c4ff]">{content}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </main>
    // </div>
    // </StudentLayout>
  )
}

export default StudentDashboard
