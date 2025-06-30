import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../auth/Services/api';
import { ChevronDown, GraduationCap, Clock, Users, Sparkles, BadgeCheck } from 'lucide-react';

const CourseCard = ({
  course,
  layout = 'vertical',
  role = 'Student',
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState();

  useEffect(() => {
    const checkEnrollment = () => {
      if (role === 'Student' && user && course?.students?.length) {
        const enrolled = course.students.some(
          (studentId) => studentId?.toString() === user._id?.toString()
        );
        setIsEnrolled(enrolled);
      } else if (role === 'Student' && typeof course.progress === 'number') {
        setIsEnrolled(true);
      }
    };

    checkEnrollment();

    if (course.thumbnail) {
      setThumbnailSrc(`${import.meta.env.VITE_BACKEND_URI}/api/uploads/${course.thumbnail}`);
    } else {
      setThumbnailSrc('/default-course.jpg');
    }
  }, [course, user, role]);

  const handleEnroll = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      toast.info('Please login or signup first');
      return navigate('/login');
    }

    const isPremiumCourse = course.isPremium;
    const hasPremiumAccess = user.subscription === 'monthly' || user.subscription === 'yearly';

    if (isPremiumCourse && !hasPremiumAccess) {
      toast.info('This is a premium course. Please subscribe to access.');
      return navigate('/subscription');
    }

    try {
      await api.post(`/course/${course._id}/enroll`);
      toast.success('Enrolled Successfully');
      setIsEnrolled(true);
      course.progress = 0;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error enrolling');
    }
  };

  const isHorizontal = layout === 'horizontal';

  const handleCardClick = () => {
    if (role === 'Student' && isEnrolled) {
      navigate(`/student/course/${course._id}`);
    } else if (role === 'Mentor') {
      navigate(`/mentor/course-view/${course._id}`);
    } else {
      navigate(`/course/view/${course._id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group transition-all duration-300 rounded-xl overflow-hidden shadow-md hover:shadow-[0_0_20px_#3b82f6] cursor-pointer
    ${isHorizontal
          ? 'flex flex-wrap sm:flex-nowrap gap-5 bg-gradient-to-r from-[#0b1b4f] to-[#01133d] border border-transparent hover:border-[#3b82f6] p-4 items-start'
          : 'flex flex-col bg-[#01133d] border border-[#1e3a8a] hover:border-[#3b82f6] p-5 h-full'
        }`}
    >
      {/* Thumbnail */}
      <div
        className={`relative shrink-0 overflow-hidden rounded-xl ${isHorizontal ? 'w-full sm:w-[250px] h-[150px]' : 'w-full h-[180px] mb-4'
          }`}
      >
        {!isEnrolled && (
          <span className={`absolute top-2 right-2 z-10 px-3 py-1 text-xs font-semibold rounded-full shadow-md flex items-center gap-1
        ${course.isPremium ? 'bg-yellow-400 text-black' : 'bg-emerald-400 text-black'}`}>
            {course.isPremium ? <Sparkles size={14} /> : <BadgeCheck size={14} />}
            {course.isPremium ? 'Premium' : 'Free'}
          </span>
        )}
        <img
          src={thumbnailSrc}
          alt={course.title}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = '/default-course.jpg')}
        />
      </div>

      {/* Textual content */}
      <div className="flex flex-col justify-between flex-1 text-white h-full">
        {/* Title + Date */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-lg md:text-xl font-bold leading-snug group-hover:text-[#3b82f6] transition line-clamp-2">
            {course.title}
          </h3>
          <span className="text-xs text-white/60 whitespace-nowrap">
            {course.createdAt ? new Date(course.createdAt).toLocaleDateString() : 'N/A'}
          </span>
        </div>

        {/* Description */}
        {role === 'Student' && (
          <p className="text-sm text-white/80 mb-2 line-clamp-1">
            {course.description || 'No description available.'}
          </p>
        )}

        {/* Tags */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          {course.category && (
            <span className="inline-block bg-[#1e293b] px-3 py-1 rounded-full border border-[#65a0ff] text-xs text-[#65a0ff]">
              {course.category}
            </span>
          )}

          {course.level && (
            <div className="flex items-center gap-1 text-sm text-white/80">
              <GraduationCap size={16} />
              {course.level}
            </div>
          )}

          {course.duration && (
            <div className="flex items-center gap-1 text-sm text-white/80">
              <Clock size={16} />
              {course.duration} hours
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4 border-t border-[#1e3a8a]">
          {role === 'Student' && !isEnrolled && (
            <button
              onClick={handleEnroll}
              className={`w-full ${course.isPremium
                ? 'bg-yellow-500 hover:bg-yellow-600 text-black font-bold'
                : 'bg-blue-600 hover:bg-blue-700 text-white font-semibold'
                } px-4 py-2 rounded-lg text-sm shadow-md transition`}
            >
              {course.isPremium ? 'Unlock Premium Course' : 'Enroll Now'}
            </button>
          )}

          {role === 'Mentor' && (
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/mentor/edit-course/${course._id}`);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm font-medium shadow"
                >
                  Edit
                </button>
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this course?')) {
                      try {
                        await api.delete(`/course/${course._id}`);
                        toast.success('Course deleted successfully');
                      } catch (err) {
                        toast.error('Failed to delete course');
                      }
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm font-medium shadow"
                >
                  Delete
                </button>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/mentor/lecture-list/${course._id}`);
                }}
                className="text-[#65a0ff] flex items-center gap-1 text-sm hover:underline"
              >
                <ChevronDown size={16} /> Lectures
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default CourseCard;
