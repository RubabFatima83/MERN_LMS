import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../auth/Services/api';
import { toast } from 'react-toastify';
import StudentLayout from '../../components/student/StudentLayout';
import CourseViewBase from '../../components/common/CourseViewBase';
import { Loader2 } from 'lucide-react';

const StudentCourseView = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [watchedLectures, setWatchedLectures] = useState([]);
  const [user, setUser] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

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
        const enrollment = courseData.enrolledStudents?.find(
          (en) => String(en.studentId) === String(currentUser._id)
        );

        setUser({ ...currentUser, isEnrolled: !!enrollment });
        if (enrollment) {
          setWatchedLectures(enrollment.watchedLectures || []);
        }
      } catch (error) {
        toast.error('Failed to load course.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLectureCompleted = async (lecture) => {
    if (!watchedLectures.includes(lecture._id)) {
      try {
        await api.post(`/lecture/${id}/${lecture._id}/complete`);
        setWatchedLectures((prev) => [...prev, lecture._id]);
        toast.success(`Marked "${lecture.title}" as completed`);
      } catch (error) {
        toast.error('Failed to mark lecture as watched');
      }
    }
  };

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      await api.post(`/course/${course._id}/enroll`);
      toast.success('Enrolled successfully!');
      window.location.reload();
    } catch (error) {
      toast.error('Enrollment failed.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="text-white text-center py-10">
          <Loader2 className="animate-spin" /> Loading course...
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <CourseViewBase
        course={course}
        selectedLecture={selectedLecture}
        setSelectedLecture={setSelectedLecture}
        watchedLectures={watchedLectures}
        onLectureComplete={handleLectureCompleted}
        user={user}
        enrolling={enrolling}
        onEnrollClick={handleEnroll}
      />
    </StudentLayout>
  );
};

export default StudentCourseView;
