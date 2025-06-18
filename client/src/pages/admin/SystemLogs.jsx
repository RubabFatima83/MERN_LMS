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

        const { data } = await api.get(`/admin/logs?${params.toString()}`, {
          headers: { 'Content-Type': 'application/json' },
        });
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

        <div className="mb-6 flex items-center space-x-3">
          <label htmlFor="level" className="font-semibold text-[#e0e7ff]">
            Filter by Level:
          </label>
          <select
            id="level"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="bg-[#012465] text-[#e0e7ff] border border-[#65a0ff] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#65a0ff]"
          >
            {levels.map((lvl) => (
              <option key={lvl} value={lvl} className="text-[#e0e7ff]">
                {lvl || 'All'}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-[#e0e7ff] text-center py-10">Loading logs...</div>
        ) : error ? (
          <div className="text-red-600 text-center py-10">Error: {error}</div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg shadow-lg border border-[#65a0ff]">
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
                      <td colSpan="4" className="text-center py-6 text-[#e0e7ff]">
                        No logs found.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr
                        key={log._id}
                        className="border-b border-[#1a2a6b] hover:bg-[#1a2a6b] transition-colors duration-200"
                      >
                        <td className="px-6 py-3 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td
                          className={`px-6 py-3 capitalize font-semibold whitespace-nowrap ${
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

            {/* Pagination */}
            <div className="mt-6 flex justify-center items-center space-x-4">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-5 py-2 bg-[#65a0ff] text-[#012465] rounded-lg font-semibold disabled:opacity-50 hover:bg-[#4d87ff] transition"
              >
                Prev
              </button>
              <span className="text-[#e0e7ff] font-semibold">
                {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-5 py-2 bg-[#65a0ff] text-[#012465] rounded-lg font-semibold disabled:opacity-50 hover:bg-[#4d87ff] transition"
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
