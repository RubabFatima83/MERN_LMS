import React from 'react'

const StudentDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#060872] shadow-lg p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Student Panel</h2>
        <nav className="space-y-4 text-sm">
          <a href="#" className="block text-gray-100 hover:text-blue-300">Courses</a>
          <a href="#" className="block text-gray-100 hover:text-blue-300">Assignments</a>
          <a href="#" className="block text-gray-100 hover:text-blue-300">Grades</a>
          <a href="#" className="block text-gray-100 hover:text-blue-300">Announcements</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-[#060872] mb-6">Welcome, Student!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Courses */}
          <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#060872]">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Courses</h2>
            <p className="text-gray-600">You are enrolled in 5 courses.</p>
          </div>

          {/* Assignments */}
          <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#060872]">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Assignments</h2>
            <p className="text-gray-600">You have 2 pending assignments.</p>
          </div>

          {/* Grades */}
          <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#060872]">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Grades</h2>
            <p className="text-gray-600">Your latest grade: A- in JavaScript.</p>
          </div>

          {/* Announcements */}
          <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#060872]">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Announcements</h2>
            <p className="text-gray-600">New semester starts on 1st June.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StudentDashboard
