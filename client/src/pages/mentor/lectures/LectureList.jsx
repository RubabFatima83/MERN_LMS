import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../../auth/Services/api'
import { toast } from 'react-toastify'
import MentorLayout from '../../../components/mentor/MentorLayout'
import { useNavigate } from 'react-router-dom';

const LectureList = () => {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const [lectures, setLectures] = useState([])

  const fetchLectures = async () => {
    try {
      const res = await api.get(`/lecture/${courseId}`)
      setLectures(res.data.data)
    } catch (error) {
      toast.error('Failed to fetch lectures')
    }
  }

  useEffect(() => {
    fetchLectures()
  }, [])

  const handleDeleteLecture = async (lectureId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this lecture?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/lecture/delete/${lectureId}`);
      toast.success("Lecture deleted successfully");
      setLectures(prev => prev.filter(lec => lec._id !== lectureId));
    } catch (err) {
      toast.error("Failed to delete lecture");
    }
  }

  const clickCreateLecture = () => {
    navigate(`/mentor/course/${courseId}/add-lectures`)
  }

  return (
    <MentorLayout>
      <div className="max-w-4xl mx-auto mt-10 mb-12">
        {/* <h2 className="text-2xl text-[#65a0ff] font-bold mb-6">Lectures</h2> */}
        <div className="flex justify-between items-center border-b border-[#65a0ff] pb-4 mb-6">
          <h2 className="text-3xl font-extrabold text-[#65a0ff]">
            Lectures
          </h2>
          <button
            onClick={clickCreateLecture}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Add Lecture
          </button>
        </div>
        {lectures.length === 0 ? (
          <p className='text-gray-300 text-center'>No lectures found.</p>
        ) : (
          <ul className="space-y-4">
            {lectures.map(lecture => (
              <li key={lecture._id} className="text-[#65a0ff] bg-[#012465] border-l-4 border-[#65a0ff] p-4 shadow rounded flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{lecture.title}</h3>
                  <p className="text-sm text-white/80 mb-2 line-clamp-1">{lecture.description}</p>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/mentor/edit-lecture/${lecture._id}`}
                    className="bg-[#65a0ff] text-white px-3 py-1 rounded hover:bg-[#2375f8]"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteLecture(lecture._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MentorLayout>
  )
}

export default LectureList
