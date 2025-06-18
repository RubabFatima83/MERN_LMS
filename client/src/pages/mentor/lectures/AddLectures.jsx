import React from 'react'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'
import LectureForm from '../../../components/mentor/LectureForm'
import MentorLayout from '../../../components/mentor/MentorLayout'

const AddLecture = () => {
  const { courseId } = useParams() // course ID
  const navigate = useNavigate()

  return (
    <MentorLayout>
      <LectureForm
        courseId={courseId}
        initialData={null}
        onSubmitSuccess={() => {
          toast.success('Lecture added successfully!');
          navigate(`/mentor/lecture-list/${courseId}`);
        }}
      />
    </MentorLayout>
  )
}

export default AddLecture
