import React, { useEffect, useState } from 'react';
import api from '../../auth/Services/api';
import { FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import MentorLayout from '../../components/mentor/MentorLayout';

const MentorMessages = () => {
  const [messages, setMessages] = useState([]);
  const [replyContent, setReplyContent] = useState({});

  // Fix: use msgId consistently, don't reference 'msg' inside this function
  const handleReply = async (msgId) => {
    const content = replyContent[msgId];
    if (!content || !content.trim()) {
      toast.warn("Reply cannot be empty");
      return;
    }

    try {
      await api.post('/mentor/reply', {
        commentId: msgId,
        content: content.trim(),
      });

      toast.success("Reply sent!");
      // Clear reply input for that message
      setReplyContent((prev) => ({ ...prev, [msgId]: '' }));
      // Refresh messages to show the new reply
      fetchMessages();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reply.");
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await api.get('/mentor/comments');
      setMessages(res.data.data || []);
    } catch (error) {
      console.error("Failed to load comments", error);
      toast.error('Failed to load comments');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <MentorLayout>
      <div className="max-w-4xl mx-auto mt-10 mb-10">
        <div className="flex justify-between items-center border-b border-[#65a0ff] pb-4 mb-6">
          <h2 className="text-3xl font-extrabold text-[#65a0ff]">Student Messages</h2>
        </div>

        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                className="bg-[#012465] text-white p-5 rounded shadow border-l-4 border-[#65a0ff]"
              >
                <div className="flex items-start gap-3 mb-3">
                  <FaUserCircle className="text-4xl text-[#65a0ff]" />
                  <div>
                    <p className="text-sm text-gray-300">{new Date(msg.createdAt).toLocaleString()}</p>
                    <p className="text-lg font-semibold text-white">{msg.userId?.name || 'Unknown User'}</p>

                    {/* Course & Lecture Title*/}
                    {(msg.courseId?.title || msg.lectureId?.title) && (
                      <p className="text-sm text-[#a0c4ff] italic">
                        {msg.courseId?.title && <>Course: {msg.courseId.title}</>}
                        {msg.courseId?.title && msg.lectureId?.title && " | "}
                        {msg.lectureId?.title && <>Lecture: {msg.lectureId.title}</>}
                      </p>
                    )}


                    <p className="text-gray-200">{msg.content}</p>
                  </div>
                </div>

                {msg.replies && msg.replies.length > 0 && (
                  <div className="ml-10 mb-3 space-y-2">
                    {msg.replies.map((reply) => (
                      <div key={reply._id || reply.createdAt} className="bg-[#0f1e40] p-3 rounded border border-gray-700 text-gray-300">
                        <p><strong>{reply.userId?.name || 'User'}:</strong> {reply.content}</p>
                        <p className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                )}

                <textarea
                  className="w-full mt-2 p-3 text-white bg-[#0f1e40] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#65a0ff]"
                  rows={3}
                  placeholder="Type your reply..."
                  value={replyContent[msg._id] || ''}
                  onChange={(e) =>
                    setReplyContent((prev) => ({ ...prev, [msg._id]: e.target.value }))
                  }
                />

                <button
                  onClick={() => handleReply(msg._id)}
                  className="mt-3 px-4 py-2 bg-[#65a0ff] text-white rounded hover:bg-[#2375f8] transition"
                >
                  Send Reply
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No messages available.</p>
          )}
        </div>
      </div>
    </MentorLayout>
  );
};

export default MentorMessages;
