import React, { useEffect, useState } from 'react';
import api from '../../auth/Services/api';
import { toast } from 'react-toastify';
import { FaComments, FaUserCircle } from 'react-icons/fa';
import { BsPatchCheckFill } from 'react-icons/bs';

const base_URL = 'http://localhost:5000';

const Comments = ({ lectureId, courseId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyInputs, setReplyInputs] = useState({});

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comment/${lectureId}`);
      // Adjust depending on backend response structure
      setComments(res.data.comments || []);
    } catch (err) {
      toast.error('Failed to load comments');
    }
  };

  useEffect(() => {
    if (lectureId) fetchComments();
  }, [lectureId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      await api.post('/comment/post', { lectureId, courseId, content: newComment.trim() });
      setNewComment('');
      fetchComments();
    } catch (err) {
      toast.error('Could not post comment');
    }
  };

  const handleReplySubmit = async (commentId) => {
    const replyContent = replyInputs[commentId];
    if (!replyContent?.trim()) return;

    try {
      await api.post(`/comment/reply/${commentId}`, { content: replyContent.trim() });
      setReplyInputs((prev) => ({ ...prev, [commentId]: '' }));
      fetchComments();
    } catch (err) {
      toast.error('Failed to post reply');
    }
  };

  return (
  <div className="mt-10">
    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
      <FaComments className="text-indigo-400" />
      Discussion
    </h3>

    {/* Add New Comment */}
    <div className="bg-[#1a1f2e] p-4 rounded-lg shadow mb-6">
      <textarea
        className="w-full p-3 rounded-lg bg-[#2a2f45] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows="3"
        placeholder="Ask your question..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={handleCommentSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          Post Comment
        </button>
      </div>
    </div>

    {/* Comments List */}
    {comments.length > 0 ? (
      comments.map((comment) => (
        <div
          key={comment._id}
          className="mb-6 bg-[#121826] p-5 rounded-xl shadow-md border border-gray-700"
        >
          {/* Comment Header */}
          <div className="flex items-center gap-3 mb-3">
            {comment.userId?.profileImage ? (
              <img
                src={`${base_URL}/api/uploads/${comment.userId?.profileImage}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border border-indigo-500"
              />
            ) : (
              <FaUserCircle className="text-3xl text-gray-400" />
            )}

            <div>
              <div className="flex items-center gap-2 text-sm text-white font-semibold">
                {comment.userId?.name || 'Unknown'}
                <span className="text-xs text-gray-400">
                  ({comment.userId?.role || 'N/A'})
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Comment Content */}
          <p className="text-base text-gray-200 leading-relaxed">{comment.content}</p>

          {/* Replies */}
          <div className="mt-4 space-y-3">
            {(comment.replies || []).map((reply) => {
              const isInstructor = reply.userId?.role === 'Instructor' || reply.userId?.role === 'Mentor';

              return (
                <div
                  key={reply._id || reply.createdAt}
                  className="ml-4 pl-4 border-l-2 border-indigo-500"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                    {reply.userId?.profileImage ? (
                      <img
                        src={`${base_URL}/api/uploads/${reply.userId?.profileImage}`}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full object-cover border border-indigo-400"
                      />
                    ) : (
                      <FaUserCircle className="text-xl text-gray-400" />
                    )}
                    <strong>{reply.userId?.name || 'Unknown'}</strong>
                    {isInstructor && (
                      <BsPatchCheckFill className="text-indigo-400" title="Instructor" />
                    )}
                    <span className="text-xs text-gray-500 ml-auto">
                      {new Date(reply.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{reply.content}</p>
                </div>
              );
            })}
          </div>

          {/* Reply Input */}
          <div className="mt-4 flex items-center space-x-2 ml-4">
            <input
              type="text"
              placeholder="Write a reply..."
              className="bg-[#2a2f45] text-white px-3 py-2 rounded-lg flex-grow border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={replyInputs[comment._id] || ''}
              onChange={(e) =>
                setReplyInputs((prev) => ({
                  ...prev,
                  [comment._id]: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleReplySubmit(comment._id);
                }
              }}
            />
            <button
              onClick={() => handleReplySubmit(comment._id)}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition text-sm font-medium"
            >
              Reply
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-400">No comments yet. Be the first to ask a question!</p>
    )}
  </div>
);
};

export default Comments;
