import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import api from '../../../auth/Services/api'
import CourseForm from '../../../components/mentor/CourseForm'
import MentorLayout from '../../../components/mentor/MentorLayout'

const backendURL = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000'

const CreateCourse = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef()

  const [formData, setFormData] = useState({
    title: '',
    demoUrl: '',
    description: '',
    duration: '',
    category: '',
    level: '',
    language: '',
    isPremium: false,
  })

  const [categoryOptions, setCategoryOptions] = useState([])
  const [levelOptions, setLevelOptions] = useState([])
  const [languageOptions, setLanguageOptions] = useState([])
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [loading, setLoading] = useState(false)

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  

  const handleThumbnailChange = e => {
    const file = e.target.files[0]
    if (file) {
      setThumbnail(file)
      setThumbnailPreview(URL.createObjectURL(file))
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      demoUrl: '',
      description: '',
      duration: '',
      category: '',
      level: '',
      language: '',
      isPremium: false,
    })
    setThumbnail(null)
    setThumbnailPreview(null)
    fileInputRef.current.value = null
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    if (!formData.title || !formData.demoUrl || !formData.description || !formData.category || !formData.language) {
      toast.error('Please fill all required fields.')
      setLoading(false)
      return
    }

    try {
      const data = new FormData()
      Object.entries(formData).forEach(([key, value]) => data.append(key, value))
      if (thumbnail) data.append('thumbnail', thumbnail)

      const res = await api.post('/course/create', data)
      const courseId = res.data.data._id
      toast.success('Course created successfully!')
      navigate(`/mentor/course/${courseId}/add-lectures`)
      resetForm()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MentorLayout>
      <CourseForm
        formData={formData}
        handleChange={handleChange}
        handleThumbnailChange={handleThumbnailChange}
        thumbnailPreview={thumbnailPreview}
        existingThumbnail={null}
        handleSubmit={handleSubmit}
        updating={false}
        categoryOptions={categoryOptions}
        levelOptions={levelOptions}
        languageOptions={languageOptions}
        backendURL={backendURL}
        fileInputRef={fileInputRef}
        thumbnail={thumbnail}
        resetForm={resetForm}
        loading={loading}
      />
    </MentorLayout>
  )
}

export default CreateCourse
