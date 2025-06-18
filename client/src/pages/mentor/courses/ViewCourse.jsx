import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import api from '../../../auth/Services/api'
import { toast } from 'react-toastify'
import MentorLayout from '../../../components/mentor/MentorLayout'

const ViewCourse = () => {
  const { id } = useParams()
  const location = useLocation()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedLecture, setSelectedLecture] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchCourseAndUser = async () => {
      try {
        const res = await api.get(`/course/get/${id}`)
        let courseData = res.data.data

        if (location.state?.newLecture) {
          const exists = courseData.lectures.find(
            (lec) => lec._id === location.state.newLecture._id
          )
          if (!exists) {
            courseData.lectures.push(location.state.newLecture)
          }
        }

        setCourse(courseData)
        setSelectedLecture({
          title: 'Introduction',
          videoUrl: courseData.videoUrl,
          description: courseData.description,
        })

        const userRes = await api.get('/auth/me')
        const isUserEnrolled = courseData.enrolledStudents?.includes(userRes.data.user._id)
        setUser({ ...userRes.data.user, isEnrolled: isUserEnrolled })
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchCourseAndUser()
  }, [id, location.state?.newLecture])

  const convertToEmbedURL = (url) => {
    try {
      const urlObj = new URL(url)
      if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.get('v')) {
        return `https://www.youtube.com/embed/${urlObj.searchParams.get('v')}`
      } else if (urlObj.hostname.includes('youtu.be')) {
        return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`
      }
      return url
    } catch {
      return url
    }
  }

  const handleLectureClick = (lecture) => {
    setSelectedLecture({
      title: lecture.title,
      videoUrl: lecture.videoUrl,
      description: lecture.description,
    })
  }

  const handleEnroll = async () => {
    try {
      await api.post(`/course/${course._id}/enroll`)
      toast.success('Enrolled successfully!')
      setUser((prev) => ({ ...prev, isEnrolled: true }))
    } catch (error) {
      toast.error(error.response?.data?.message || 'Enrollment failed')
    }
  }

  if (loading) return <p className="text-center mt-10 text-indigo-400 animate-pulse">Loading course...</p>
  if (!course) return <p className="text-center text-red-500 mt-10 font-semibold">Course not found</p>

  return (
    <MentorLayout>
      <div className="max-w-7xl mx-auto mt-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Left Column: Video and Details */}
          <div className="md:col-span-3 space-y-8 text-gray-200">
            <h2 className="text-4xl font-extrabold text-indigo-400">{selectedLecture?.title}</h2>

            {selectedLecture?.videoUrl ? (
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-indigo-600 bg-black">
                <iframe
                  src={convertToEmbedURL(selectedLecture.videoUrl)}
                  title={selectedLecture.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <p className="text-indigo-300 italic">No video available.</p>
            )}

            <p className="text-lg leading-relaxed whitespace-pre-line">{selectedLecture?.description}</p>

            {user?.role === 'mentor' && (
              <Link
                to={`/mentor/course/edit/${course._id}`}
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition"
              >
                Edit Course
              </Link>
            )}
          </div>

          {/* Right Column: Lectures & Actions */}
          <div className="md:col-span-1 bg-[#14244d] border border-indigo-700 rounded-xl p-6 shadow-lg space-y-6 sticky top-24 h-fit text-gray-300">
            <h3 className="text-2xl font-semibold text-indigo-300 mb-4">Lectures</h3>

            {course.lectures?.length > 0 ? (
              <ul className="space-y-2 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-indigo-900">
                {course.lectures.map((lecture, index) => (
                  <li
                    key={lecture._id}
                    onClick={() => handleLectureClick(lecture)}
                    className={`cursor-pointer p-3 rounded-md text-base transition border ${
                      selectedLecture?.title === lecture.title
                        ? 'bg-indigo-700 text-white font-semibold border-indigo-400'
                        : 'hover:bg-indigo-800 border-transparent'
                    }`}
                  >
                    {index + 1}. {lecture.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-indigo-400 italic">No lectures available.</p>
            )}

            {user?.role === 'Student' && !user?.isEnrolled && (
              <button
                onClick={handleEnroll}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
              >
                Enroll Now
              </button>
            )}

            {user?.role === 'mentor' && (
              <Link
                to={`/mentor/course/${course._id}/add-lectures`}
                className="block text-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
              >
                + Add Lecture
              </Link>
            )}
          </div>
        </div>
      </div>
    </MentorLayout>
  )
}

export default ViewCourse
