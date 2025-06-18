import React from 'react';

const FaqForm = ({ formData, handleChange, handleSubmit, editing }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#012465] p-6 rounded-lg border border-[#65a0ff] mb-8 text-[#65a0ff]"
    >
      <div className="mb-4">
        <label className="block font-medium mb-1">Question</label>
        <input
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-transparent text-white border border-[#65a0ff] rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Answer</label>
        <textarea
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          rows={4}
          required
          className="w-full px-4 py-2 bg-transparent text-white border border-[#65a0ff] rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {editing ? 'Update FAQ' : 'Add FAQ'}
      </button>
    </form>
  );
};

export default FaqForm;
