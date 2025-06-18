import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserRound, Star, GraduationCap } from 'lucide-react';
import api from '../../auth/Services/api';
import { toast } from 'react-toastify';
import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Home/Footer';

const base_URL = 'http://localhost:5000';

const GeneralCourseView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [relatedCourses, setRelatedCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await api.get(`/course/get/${id}`);
        setCourse(courseRes.data.data);

        try {
          const userRes = await api.get('/auth/me');
          const userData = userRes.data.user;
          setUser(userData);
          setIsEnrolled(userData.enrolledCourses.includes(id));
        } catch {
          setUser(null);
        }
      } catch (error) {
        toast.error('Error loading course');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const convertToEmbedURL = (url) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes('youtube.com') && parsed.searchParams.get('v')) {
        return `https://www.youtube.com/embed/${parsed.searchParams.get('v')}`;
      }
      if (parsed.hostname.includes('youtu.be')) {
        return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;

  return (
  <>
    <Navbar />
    <div className="min-h-screen bg-[#010f2a] text-white px-4 md:px-20 py-10">
      <h1 className="text-4xl font-bold text-blue-400 mb-8">{course?.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* LEFT CONTENT */}
        <div className="md:col-span-3 space-y-10">
          {/* Video Preview */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">🎬 Course Preview</h2>
            <div className="aspect-video rounded-xl overflow-hidden shadow border border-gray-700 bg-[#0c1a2e]">
              {course?.demoUrl ? (
                <iframe
                  src={convertToEmbedURL(course.demoUrl)}
                  title="Course Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No demo video available
                </div>
              )}
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">📘 Description</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line bg-[#0c1a2e] p-4 rounded-lg border border-gray-700">
              {course?.description || 'No description provided.'}
            </p>
          </section>

          {/* Key Takeaways */}
          {course?.keyTakeaways?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">✅ What You’ll Learn</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-1 pl-4">
                {course.keyTakeaways.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </section>
          )}

          {/* FAQs */}
          {course?.faqs?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">❓ FAQs</h2>
              <div className="space-y-4">
                {course.faqs.map((faq, idx) => (
                  <details key={idx} className="bg-[#0c1a2e] p-4 rounded-lg border border-gray-700">
                    <summary className="cursor-pointer font-medium text-blue-300">{faq.question}</summary>
                    <p className="text-gray-300 mt-2">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Mentor Info */}
          {course?.mentor && (
            <section>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-white">
                <UserRound size={20} className="text-[#65a0ff]" />
                Instructor
              </h2>
              <div className="flex items-center gap-4 bg-[#0c1a2e] p-4 rounded-lg border border-gray-700">
                <img
                  src={`${base_URL}/api/uploads/${course.mentor.profileImage}`}
                  alt="Mentor"
                  className="w-16 h-16 rounded-full object-cover border border-gray-600"
                />
                <div>
                  <h3 className="font-semibold text-white">{course.mentor.name}</h3>
                  <p className="text-gray-300 text-sm">{course.mentor.bio}</p>
                </div>
              </div>
            </section>
          )}

          {/* Reviews */}
          <section>
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-white">
              <Star size={20} className="text-yellow-400" />
              Ratings & Reviews
            </h2>
            {course?.reviews?.length > 0 ? (
              <div className="space-y-4">
                {course.reviews.map((review, idx) => (
                  <div key={idx} className="bg-[#0c1a2e] p-4 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-2 text-sm">
                      <strong>{review.name}</strong>
                      <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                    </div>
                    <p className="text-gray-300 mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No reviews yet.</p>
            )}
          </section>

          {/* Related Courses */}
          {relatedCourses?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 text-white">📚 Related Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedCourses.map((related) => (
                  <div key={related._id} className="bg-[#012465] p-4 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-bold text-white">{related.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{related.description}</p>
                    <button
                      onClick={() => navigate(`/course/${related._id}`)}
                      className="mt-2 text-sm text-indigo-400 hover:underline"
                    >
                      View Course →
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="md:col-span-1">
          <div className="sticky top-36 mt-10 bg-[#0c1a2e] p-6 rounded-xl border border-gray-700 shadow-lg space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
              <GraduationCap size={18} />
              Course Access
            </h3>

            <div>
              {course?.isPremium ? (
                <span className="bg-yellow-600/90 text-white px-3 py-1 rounded-full text-xs font-medium inline-block">
                  Premium Course
                </span>
              ) : (
                <span className="bg-green-600/90 text-white px-3 py-1 rounded-full text-xs font-medium inline-block">
                  Free Course
                </span>
              )}
            </div>

            {/* Mentor CTA Button */}
            {user?.role === 'Mentor' && (
              <button
                onClick={() => navigate(`/mentor/edit-course/${course._id}`)}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-xl text-sm font-medium transition"
              >
                Edit Course
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

};

export default GeneralCourseView;
