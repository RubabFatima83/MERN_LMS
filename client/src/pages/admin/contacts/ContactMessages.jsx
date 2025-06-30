import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../auth/Services/api";
import { toast } from "react-toastify";
import AdminLayout from "../../../components/admin/AdminLayout";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/contact/allMessages");
        setMessages(res.data);
      } catch (error) {
        toast.error("Failed to load messages");
      }
    };
    fetchMessages();
  }, []);

  const handleDeleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await api.delete(`/contact/delete/${id}`);
        toast.success("Message deleted successfully");
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
      } catch (error) {
        toast.error("Failed to delete message");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto mb-20 px-4 sm:px-8 py-8 rounded-2xl shadow-md text-[#65a0ff]">
        <h2 className="text-3xl font-bold mb-6 text-white border-b border-[#65a0ff] pb-2">
          Contact Messages
        </h2>

        {messages.length === 0 ? (
          <p className="text-gray-400 text-lg text-center">No contact messages found.</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li
                key={msg._id}
                className="bg-[#012465] p-4 rounded-lg border-l-4 border-[#65a0ff] shadow text-[#65a0ff] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
              >
                {/* Message Content */}
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => navigate(`/admin/contact/${msg._id}`)}
                >
                  <h3 className="font-semibold text-lg">{msg.name}</h3>
                  <p className="text-sm text-gray-300 mt-1 break-words max-w-full">
                    {msg.message.length > 100
                      ? `${msg.message.slice(0, 100)}...`
                      : msg.message}
                  </p>
                  <p className="text-xs text-[#9fc9ff] mt-1">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex sm:flex-row flex-col gap-2 sm:gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/contact/${msg._id}`);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMessage(msg._id);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminContactMessages;
