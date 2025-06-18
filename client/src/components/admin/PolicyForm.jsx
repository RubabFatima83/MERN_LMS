import React from 'react';

const PrivacyForm = ({ formData, handleChange, handleSubmit, editing }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#012465] p-6 rounded-lg border border-[#65a0ff] mb-8 text-[#65a0ff]"
    >
      <div className="mb-4">
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-transparent text-white border border-[#65a0ff] rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={5}
          required
          className="w-full px-4 py-2 bg-transparent text-white border border-[#65a0ff] rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {editing ? 'Update' : 'Add'} Privacy Policy
      </button>
    </form>
  );
};

export default PrivacyForm;
