import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../auth/Services/api';
import { toast } from 'react-toastify';
import MentorLayout from '../../components/mentor/MentorLayout';
import CourseViewBase from '../../components/common/CourseViewBase';
import { Loader2 } from 'lucide-react';

const MentorCourseView = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, userRes] = await Promise.all([
          api.get(`/course/get/${id}`),
          api.get('/auth/me'),
        ]);

        const courseData = courseRes.data.data;
        const currentUser = userRes.data.user;

        setCourse(courseData);
        setSelectedLecture(courseData.lectures?.[0] || {});
        setMentor({ ...currentUser, role: 'Mentor' }); // Ensure role is passed to CourseViewBase
      } catch (error) {
        toast.error('Failed to load course.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <MentorLayout>
        <div className="text-white text-center py-10">
          <Loader2 className="animate-spin" /> Loading course...
        </div>
      </MentorLayout>
    );
  }

  return (
    <MentorLayout>
      <CourseViewBase
        course={course}
        selectedLecture={selectedLecture}
        setSelectedLecture={setSelectedLecture}
        watchedLectures={[]} // Mentors don't track watched lectures
        onLectureComplete={() => {}} // No-op for mentors
        user={mentor}
        enrolling={false} // No enroll button for mentor
        onEnrollClick={() => {}} // No-op
      />
    </MentorLayout>
  );
};

export default MentorCourseView;
