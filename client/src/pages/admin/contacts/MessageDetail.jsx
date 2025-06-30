import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../auth/Services/api";
import { toast } from "react-toastify";
import AdminLayout from "../../../components/admin/AdminLayout";

const MessageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [reply, setReply] = useState({ subject: "", message: "" });

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await api.get(`/contact/message/${id}`);
        setMessage(res.data);
        setReply({ ...reply, email: res.data.email });
      } catch (error) {
        toast.error("Failed to load message.");
        navigate("/admin/contact");
      }
    };
    fetchMessage();
  }, [id]);

  const handleInputChange = (field, value) => {
    setReply((prev) => ({ ...prev, [field]: value }));
  };

  const handleReply = async () => {
    if (!reply.email || !reply.subject || !reply.message) {
      toast.error("Please fill all fields.");
      return;
    }
    try {
      await api.post("/contact/reply", { id, ...reply });
      toast.success("Reply sent successfully");
      setReply({ subject: "", message: "", email: message.email });
      const updated = await api.get(`/contact/message/${id}`);
      setMessage(updated.data);
    } catch (error) {
      toast.error("Failed to send reply");
    }
  };

  if (!message) return null;

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mb-20 px-4 sm:px-8 py-8 rounded-2xl shadow-md text-[#65a0ff]">
        <h2 className="text-3xl font-bold mb-6 text-white border-b border-[#65a0ff] pb-2">
          Message Details
        </h2>

        <div className="bg-[#0b1f4c] p-6 border border-[#65a0ff] rounded-lg text-white space-y-4 text-sm sm:text-base">
          <p><strong>Name:</strong> {message.name}</p>
          <p><strong>Email:</strong> {message.email}</p>
          <p><strong>Message:</strong> {message.message}</p>
          <p className="text-xs sm:text-sm text-[#9fc9ff]">Received: {new Date(message.createdAt).toLocaleString()}</p>

          {message.reply && (
            <div className="mt-4 border-t border-[#65a0ff] pt-4 text-green-400">
              <strong className="text-white">Admin Reply:</strong> {message.reply}
            </div>
          )}

          <div className="space-y-3 mt-4">
            <input
              type="text"
              placeholder="Subject"
              value={reply.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              className="w-full px-4 py-2 border border-[#65a0ff] rounded bg-transparent text-white text-sm sm:text-base"
            />
            <textarea
              placeholder="Your reply..."
              rows="4"
              value={reply.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="w-full px-4 py-2 border border-[#65a0ff] rounded bg-transparent text-white text-sm sm:text-base"
            />
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <button
                onClick={() => navigate("/admin/messages")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={handleReply}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MessageDetails;
