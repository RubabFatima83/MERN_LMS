import React, { useEffect, useState } from 'react'
import CourseCard from '../../components/common/CourseCard'
import api from '../../auth/Services/api'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const CourseSection = () => {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/course/get')
        setCourses(data?.data || [])
        setFilteredCourses(data?.data || [])
      } catch (err) {
        toast.error('Failed to load courses')
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    let results = courses

    if (searchTerm) {
      results = results.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course?.mentor?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (category !== 'All') {
      results = results.filter((course) => course.category === category)
    }

    setFilteredCourses(results)
  }, [searchTerm, category, courses])

  const handleEnroll = (courseId) => {
    toast.info(`Enroll clicked for course ID: ${courseId}`)
  }

  const allCategories = ['All', ...new Set(courses.map((c) => c.category).filter(Boolean))]

  return (
    <section id='courses'
      className="min-h-screen px-4 sm:px-8 md:px-16 py-16 bg-[#001845] text-white"
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-wide">
          Explore Our <span className="text-[#65a0ff]">Courses</span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Learn from mentors, sharpen your skills, and grow with hands-on courses
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 max-w-7xl mx-auto">
        <input
          type="text"
          placeholder="🔍 Search by course or mentor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#0c1f3f] border border-blue-600 rounded-lg px-5 py-3 text-white placeholder-blue-400 w-full sm:w-[320px] focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:ring-from-[#3a86ff] focus:ring-to-[#00ffea] transition-colors duration-300"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#0c1f3f] border border-blue-600 rounded-lg px-5 py-3 text-white w-full sm:w-[220px] focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:ring-from-[#3a86ff] focus:ring-to-[#00ffea] hover:border-[#3a86ff] transition duration-300"
        >
          {allCategories.map((cat, i) => (
            <option
              key={i}
              value={cat}
              className="bg-[#0c1f3f] text-white"
            >
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredCourses.length === 0 ? (
        <p className="text-gray-400 text-center sm:text-left max-w-7xl mx-auto text-lg">
          No matching courses found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto pb-8">
          {filteredCourses.slice(0, 6).map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 15px rgba(0,0,0,0.3)' }}
              className="rounded-lg"
            >
              <CourseCard course={course} onEnroll={handleEnroll} />
            </motion.div>
          ))}
        </div>
      )}

      {filteredCourses.length > 6 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => (window.location.href = '/courses')}
            className="inline-block bg-gradient-to-r from-[#3a86ff] to-[#00ffea] hover:from-[#2f6ddb] hover:to-[#00ccbd] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            View All Courses
          </button>
        </div>
      )}
    </section>
  )
}

export default CourseSection
