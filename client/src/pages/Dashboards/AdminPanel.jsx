import React from 'react'

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#060872] text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 text-white text-center">Admin Panel</h2>
        <nav className="space-y-6 text-sm">
          <a href="#" className="block hover:text-blue-300">User Management</a>
          <a href="#" className="block hover:text-blue-300">Site Analytics</a>
          <a href="#" className="block hover:text-blue-300">Reports</a>
          <a href="#" className="block hover:text-blue-300">System Logs</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-semibold text-[#060872] mb-6">Welcome, Admin!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Cards */}
          <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#060872]">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">User Registrations</h3>
            <p className="text-gray-600">Monitor user signup trends.</p>
          </div>

          <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#060872]">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytics Overview</h3>
            <p className="text-gray-600">Track platform activity and growth.</p>
          </div>

          <div className="bg-white shadow rounded-lg p-4 border-t-4 border-[#060872]">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">System Logs</h3>
            <p className="text-gray-600">Keep an eye on system health.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
