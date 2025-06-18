import React from 'react';

const ReusableTable = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto bg-[#012465] rounded-lg border-l-4 border-[#65a0ff] shadow-lg">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-[#060f60]">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-6 py-3 text-left text-[#65a0ff] uppercase text-sm font-semibold tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? 'bg-[#011f70]' : 'bg-[#022c8a]'
                } transition-transform duration-200 hover:scale-[1.01]`}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-white">
                    {row[col.accessor] || '—'}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-300 italic"
              >
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
