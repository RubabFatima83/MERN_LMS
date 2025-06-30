import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { Play } from 'lucide-react';
import { FaCheckCircle } from 'react-icons/fa';
import { BsPatchCheckFill } from 'react-icons/bs';
import Comments from '../student/Comments';

const CourseViewBase = ({
  course,
  selectedLecture,
  setSelectedLecture,
  watchedLectures = [],
  onLectureComplete,
  user,
  enrolling,
  onEnrollClick,
}) => {
  const [expandDescription, setExpandDescription] = useState(false);

  const getYouTubeVideoId = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.hostname.includes('youtube.com')
        ? parsed.searchParams.get('v')
        : parsed.pathname.slice(1);
    } catch {
      return null;
    }
  };

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
    setExpandDescription(false); // Collapse description when switching lecture
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const truncatedDescription = (desc) => {
    if (!desc) return 'No description available.';
    return expandDescription ? desc : desc.split('\n').slice(0, 2).join('\n') + '...';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-2xl sm:text-4xl font-bold text-blue-400 mb-4">
        {course.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-3">
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow border border-gray-700">
            {selectedLecture?.videoUrl ? (
              <YouTube
                className="w-full h-full"
                videoId={getYouTubeVideoId(selectedLecture.videoUrl)}
                onEnd={() => onLectureComplete?.(selectedLecture)}
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: { autoplay: 0 },
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
                No video available
              </div>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 flex items-center gap-2">
              <Play className="text-blue-400" />
              {selectedLecture?.title}
            </h2>

            <p
              className="text-sm sm:text-base text-gray-300 leading-relaxed bg-[#0c1a2e] p-4 rounded-lg shadow-inner whitespace-pre-line cursor-pointer transition hover:bg-[#0d2236]"
              onClick={() => setExpandDescription((prev) => !prev)}
            >
              {truncatedDescription(selectedLecture?.description)}
              {!expandDescription && selectedLecture?.description?.split('\n').length > 2 && (
                <span className="text-blue-400 ml-2">Read more</span>
              )}
            </p>
          </div>

          <div className="mt-8">
            <Comments
              lectureId={selectedLecture?._id}
              courseId={course?._id}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-transparent rounded-xl p-4 sticky top-20 max-h-[80vh] overflow-y-auto custom-scrollbar border border-gray-700">
            <h3 className="text-white text-xl font-bold mb-4 border-b border-gray-500 pb-2">Lectures</h3>

            {course?.lectures?.length > 0 && watchedLectures.length === course.lectures.length && (
              <div className="flex items-center gap-2 text-green-400 text-sm font-semibold border-b border-gray-500 rounded-md p-3 mb-4 bg-green-900/10 animate-pulse shadow-sm">
                <BsPatchCheckFill className="text-xl" />
                <span>All lectures completed!</span>
              </div>
            )}

            <ul className="space-y-2">
              {course.lectures.map((lecture, idx) => {
                const isWatched = watchedLectures.includes(lecture._id);
                return (
                  <li
                    key={lecture._id}
                    onClick={() => handleLectureClick(lecture)}
                    className={`cursor-pointer flex items-center justify-between p-3 border-b border-gray-500 transition duration-200 ${
                      selectedLecture?._id === lecture._id
                        ? 'bg-blue-100 text-blue-800 font-semibold'
                        : 'hover:bg-[#1a2b4d] text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm sm:text-base">
                      <Play size={16} />
                      {idx + 1}. {lecture.title}
                    </span>
                    {isWatched && <FaCheckCircle className="text-green-400 text-lg" />}
                  </li>
                );
              })}
            </ul>

            {user?.role === 'Student' && !user?.isEnrolled && (
              <button
                onClick={onEnrollClick}
                disabled={enrolling}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition text-sm"
              >
                {enrolling ? 'Enrolling...' : 'Enroll Now'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewBase;
