import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../auth/Services/api';

const LectureForm = ({ courseId, onSubmitSuccess, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setVideoUrl(initialData.videoUrl || '');
      setDuration(initialData.duration || '');
    } else {
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setDuration('');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      description,
      videoUrl,
      duration,
      courseId, 
    };

    try {
      if (initialData?._id) {
        await api.put(`/lecture/update/${initialData._id}`, payload);
        toast.success('Lecture updated successfully!');
      } else {
        await api.post(`/lecture/add/${courseId}`, payload);
        toast.success('Lecture added successfully!');
      }

      onSubmitSuccess();
    } catch (error) {
      console.error("Error submitting lecture:", error);
      toast.error(error?.response?.data?.message || "Failed to submit lecture.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-[#0a1a4f] rounded-2xl shadow-md border border-[#65a0ff] text-[#65a0ff]">
      <h2 className="text-3xl font-bold mb-6 text-white">
        {initialData ? 'Edit Lecture' : 'Add Lecture'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#65a0ff] rounded bg-transparent text-white"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#65a0ff] rounded bg-transparent text-white"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Video URL</label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#65a0ff] rounded bg-transparent text-white"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Duration (minutes)</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#65a0ff] rounded bg-transparent text-white"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            {loading ? 'Saving...' : initialData ? 'Update Lecture' : 'Add Lecture'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LectureForm;
