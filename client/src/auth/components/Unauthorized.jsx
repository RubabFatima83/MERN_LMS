import { Link } from "react-router-dom";
import { ShieldOff } from "lucide-react"; 

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a] px-4">
      <div className="bg-[#1e293b] text-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-md text-center border border-gray-700">
        <div className="flex flex-col items-center mb-6">
          <ShieldOff className="h-12 w-12 text-red-500 mb-2" />
          <h1 className="text-4xl font-extrabold text-red-500">403</h1>
          <p className="text-lg font-semibold text-gray-300 mt-1">Unauthorized Access</p>
        </div>

        <p className="text-sm text-gray-400 mb-6">
          You don’t have permission to view this page. If you think this is a mistake, contact support.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
