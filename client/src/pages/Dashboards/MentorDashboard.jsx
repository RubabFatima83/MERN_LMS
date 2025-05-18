import React from 'react'

const MentorDashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#060872] text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 text-white text-center">Mentor Panel</h2>
        <nav className="space-y-6 text-sm">
          <a href="#" className="block hover:text-blue-300">Student List</a>
          <a href="#" className="block hover:text-blue-300">Manage Courses</a>
          <a href="#" className="block hover:text-blue-300">Messages</a>
          <a href="#" className="block hover:text-blue-300">Reports</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-semibold text-[#060872] mb-6">Welcome, Mentor!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Card */}
          <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#060872]">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Student Overview</h3>
            <p className="text-gray-600">View performance and feedback.</p>
          </div>

          <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#060872]">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Course Updates</h3>
            <p className="text-gray-600">Manage or publish new materials.</p>
          </div>

          <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#060872]">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Messages</h3>
            <p className="text-gray-600">Stay in touch with students.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MentorDashboard
