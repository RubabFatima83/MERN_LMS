import React from 'react';
import { FaUpload } from 'react-icons/fa';

const CourseForm = ({
  formData,
  handleChange,
  handleThumbnailChange,
  thumbnailPreview,
  existingThumbnail,
  handleSubmit,
  updating,
  categoryOptions,
  levelOptions,
  languageOptions,
  backendURL,
  fileInputRef,
  thumbnail,
  resetForm,
  loading,
}) => {
  return (
    <div className="max-w-5xl mx-auto mb-24 p-4 sm:p-6 bg-[#0a1a4f] rounded-2xl shadow-md border border-[#65a0ff] text-[#65a0ff]">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
        {updating ? 'Update Course' : 'Create a New Course'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Course Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#65a0ff] rounded bg-transparent text-white"
          />
        </div>

        {/* Demo Video */}
        <div>
          <label className="block mb-1 font-medium">Demo Video URL *</label>
          <input
            type="text"
            name="demoUrl"
            value={formData.demoUrl || ''}
            onChange={handleChange}
            required
            placeholder="e.g., https://youtu.be/xyz123"
            className="w-full px-4 py-2 border border-[#65a0ff] rounded bg-transparent text-white"
          />
        </div>

        {/* Category, Level, Language, Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#65a0ff] rounded bg-transparent text-white"
            >
              <option className="text-[#0a1a4f] bg-[#65a0ff]" value="">
                -- Select Category --
              </option>
              {categoryOptions.map((cat, i) => (
                <option key={i} value={cat} className="text-[#0a1a4f] bg-[#a9caff]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Level *</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#65a0ff] rounded bg-transparent text-white"
            >
              <option className="text-[#0a1a4f] bg-[#65a0ff]" value="">
                -- Select Level --
              </option>
              {levelOptions.map((lvl, i) => (
                <option key={i} value={lvl} className="text-[#0a1a4f] bg-[#a9caff]">
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#65a0ff] rounded bg-transparent text-white"
            >
              <option className="text-[#0a1a4f] bg-[#65a0ff]" value="">
                -- Select Language --
              </option>
              {languageOptions.map((lang, i) => (
                <option key={i} value={lang} className="text-[#0a1a4f] bg-[#a9caff]">
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Duration (in hours)</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 10"
              className="w-full px-4 py-2 border border-[#65a0ff] rounded bg-transparent text-white"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Course Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-[#65a0ff] rounded bg-transparent text-white"
          />
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block mb-1 font-medium">Thumbnail Image (Optional)</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="hidden"
              id="thumbnailInput"
            />
            <label
              htmlFor="thumbnailInput"
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 flex items-center gap-2"
            >
              <FaUpload /> Choose File
            </label>
            <span className="text-sm text-white">{thumbnail ? thumbnail.name : 'No file chosen'}</span>
          </div>

          {thumbnailPreview && (
            <div className="mt-4">
              <p className="font-medium text-white">Preview:</p>
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="mt-2 rounded-lg border border-[#65a0ff] w-40 h-auto object-cover"
              />
            </div>
          )}

          {!thumbnailPreview && existingThumbnail && (
            <div className="mt-4">
              <p className="font-medium text-white">Current Thumbnail:</p>
              <img
                src={`${backendURL}/uploads/${existingThumbnail}`}
                alt="Existing Thumbnail"
                className="mt-2 rounded-lg border border-[#65a0ff] w-40 h-auto object-cover"
              />
            </div>
          )}
        </div>

        {/* Is Premium */}
        <div>
          <label className="inline-flex items-center space-x-2 text-white font-medium">
            <input
              type="checkbox"
              name="isPremium"
              checked={formData.isPremium}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: 'isPremium',
                    value: e.target.checked,
                    type: 'checkbox',
                  },
                })
              }
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>Is this a Premium Course?</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <button
            type="button"
            onClick={resetForm}
            className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            {loading
              ? updating
                ? 'Updating...'
                : 'Creating...'
              : updating
              ? 'Update Course'
              : 'Create Course'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
