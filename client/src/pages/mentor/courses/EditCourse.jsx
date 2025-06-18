import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../../auth/Services/api'
import { toast } from 'react-toastify'
import CourseForm from '../../../components/mentor/CourseForm'
import MentorLayout from '../../../components/mentor/MentorLayout'

const EditCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef()

  const [formData, setFormData] = useState({
    title: '',
    demoUrl: '',
    description: '',
    duration: '',
    category: '',
    level: 'Beginner',
    language: '',
    isPremium: false,
  })

  const [categoryOptions, setCategoryOptions] = useState([])
  const [levelOptions, setLevelOptions] = useState([])
  const [languageOptions, setLanguageOptions] = useState([])
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [existingThumbnail, setExistingThumbnail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const backendURL = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000'


  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await api.get('/course/filters_options')
        setCategoryOptions(res.data.data.categories || [])
        setLevelOptions(res.data.data.levels || [])
        setLanguageOptions(res.data.data.languages || [])
      } catch (err) {
        toast.error('Failed to load category and level options')
      }
    }

    fetchOptions()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleThumbnailChange = e => {
    const file = e.target.files[0]
    if (file) {
      setThumbnail(file)
      setThumbnailPreview(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/course/get/${id}`)
        const course = res.data
        setFormData({
          title: course.title,
          demoUrl: course.demoUrl,
          description: course.description,
          duration: course.duration,
          category: course.category,
          level: course.level,
          language: course.language,
          isPremium: course.isPremium
        })
        setExistingThumbnail(course.thumbnail || null)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch course')
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [id])



  const handleSubmit = async e => {
    e.preventDefault()
    setUpdating(true)

    try {
      const data = new FormData()
      if (formData.title) data.append('title', formData.title)
      if (formData.description) data.append('description', formData.description)
      if (formData.demoUrl) data.append('demoUrl', formData.demoUrl)
      if (formData.duration) data.append('duration', formData.duration)
      if (formData.category) data.append('category', formData.category)
      if (formData.level) data.append('level', formData.level)
      if (formData.language) data.append('language', formData.language)
      if (formData.isPremium) data.append('isPremium', formData.isPremium)

      if (thumbnail) data.append('thumbnail', thumbnail)

      await api.put(`/course/update/${id}`, data)

      toast.success('Course updated successfully!')
      // navigate(`/mentor/course/view/${id}`)
      navigate('/mentor/my-courses')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update course')
    } finally {
      setUpdating(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      demoUrl: '',
      description: '',
      duration: '',
      category: '',
      level: 'Beginner',
      language: '',
      isPremium: false,
    })
    setThumbnail(null)
    setThumbnailPreview(null)
    fileInputRef.current.value = null
  }

  return (
    <MentorLayout>
      {loading ? (
        <div className="p-4 text-gray-600">Loading course data...</div>
      ) : (
        <CourseForm
          formData={formData}
          handleChange={handleChange}
          handleThumbnailChange={handleThumbnailChange}
          thumbnailPreview={thumbnailPreview}
          existingThumbnail={existingThumbnail}
          handleSubmit={handleSubmit}
          updating={true}
          categoryOptions={categoryOptions}
          levelOptions={levelOptions}
          languageOptions={languageOptions}
          backendURL={backendURL}
          fileInputRef={fileInputRef}
          thumbnail={thumbnail}
          resetForm={resetForm}
          loading={loading}
        />
      )}
    </MentorLayout>
  )
}

export default EditCourse
