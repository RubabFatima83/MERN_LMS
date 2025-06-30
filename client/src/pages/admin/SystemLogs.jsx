import React, { useEffect, useState } from 'react';
import api from '../../auth/Services/api';
import AdminLayout from '../../components/admin/AdminLayout';

const levels = ['', 'info', 'warning', 'error'];

const AdminSystemLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterLevel, setFilterLevel] = useState('');

  const limit = 20;

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page, limit });
        if (filterLevel) params.append('level', filterLevel);

        const { data } = await api.get(`/admin/logs?${params.toString()}`);
        setLogs(data.logs);
        setTotalPages(data.pages);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [page, filterLevel]);

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#65a0ff] mb-6 border-b border-[#65a0ff] pb-2 tracking-wide drop-shadow-lg">
          System Logs
        </h1>

        {/* Filter Dropdown */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-3">
          <label htmlFor="level" className="font-semibold text-[#e0e7ff]">
            Filter by Level:
          </label>
          <select
            id="level"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="bg-[#012465] text-[#e0e7ff] border border-[#65a0ff] rounded px-3 py-2 w-full sm:w-auto"
          >
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl || 'All'}
              </option>
            ))}
          </select>
        </div>

        {/* Loader or Error */}
        {loading ? (
          <div className="text-[#e0e7ff] text-center py-10">Loading logs...</div>
        ) : error ? (
          <div className="text-red-600 text-center py-10">Error: {error}</div>
        ) : (
          <>
            {/* ✅ Table Layout for Large Screens */}
            <div className="hidden lg:block overflow-x-auto rounded-lg shadow-lg border border-[#65a0ff]">
              <table className="min-w-full divide-y divide-[#65a0ff] bg-[#012465] text-[#e0e7ff]">
                <thead>
                  <tr className="border-b border-[#65a0ff]">
                    {['Timestamp', 'Level', 'Message', 'User'].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-sm font-semibold tracking-wide"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-6">No logs found.</td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr
                        key={log._id}
                        className="border-b border-[#1a2a6b] hover:bg-[#1a2a6b] transition-colors"
                      >
                        <td className="px-6 py-3 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td
                          className={`px-6 py-3 capitalize font-semibold ${
                            log.level === 'error'
                              ? 'text-red-500'
                              : log.level === 'warning'
                              ? 'text-yellow-400'
                              : 'text-green-400'
                          }`}
                        >
                          {log.level || '-'}
                        </td>
                        <td className="px-6 py-3">{log.message}</td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          {log.user?.name || '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* ✅ Card Layout for ≤768px */}
            <div className="md:block lg:hidden space-y-4">
              {logs.length === 0 ? (
                <p className="text-center text-[#e0e7ff]">No logs found.</p>
              ) : (
                logs.map((log) => (
                  <div
                    key={log._id}
                    className="bg-[#012465] p-4 rounded-lg border border-[#65a0ff] shadow"
                  >
                    <p><span className="font-semibold text-[#65a0ff]">Timestamp:</span> {new Date(log.timestamp).toLocaleString()}</p>
                    <p>
                      <span className="font-semibold text-[#65a0ff]">Level:</span>{' '}
                      <span
                        className={`font-semibold ${
                          log.level === 'error'
                            ? 'text-red-500'
                            : log.level === 'warning'
                            ? 'text-yellow-400'
                            : 'text-green-400'
                        }`}
                      >
                        {log.level}
                      </span>
                    </p>
                    <p><span className="font-semibold text-[#65a0ff]">Message:</span> {log.message}</p>
                    <p><span className="font-semibold text-[#65a0ff]">User:</span> {log.user?.name || '-'}</p>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center items-center gap-4 flex-wrap">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-5 py-2 bg-[#65a0ff] text-[#012465] text-xs md:text-lg rounded-lg font-semibold disabled:opacity-50 hover:bg-[#4d87ff] transition"
              >
                Prev
              </button>
              <span className="text-[#e0e7ff] text-xs md:text-lg font-semibold ">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-5 py-2 bg-[#65a0ff] text-[#012465] text-xs md:text-lg rounded-lg font-semibold disabled:opacity-50 hover:bg-[#4d87ff] transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSystemLogs;
