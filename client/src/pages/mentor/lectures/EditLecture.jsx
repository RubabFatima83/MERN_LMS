import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../auth/Services/api';
import { toast } from 'react-toastify';
import LectureForm from '../../../components/mentor/LectureForm';
import MentorLayout from '../../../components/mentor/MentorLayout';

const EditLecture = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const res = await api.get(`/lecture/get/${id}`);
        const { data } = res.data;
        setInitialData(data);
      } catch (error) {
        toast.error('Failed to fetch lecture');
      } finally {
        setLoading(false);
      }
    };

    fetchLecture();
  }, [id]);

  return (
    <MentorLayout>
      {loading ? (
        <div className="p-4 text-gray-600">Loading...</div>
      ) : (
        <LectureForm
          initialData={initialData}
          onSubmitSuccess={() => {
            toast.success('Lecture updated successfully');
            navigate('/mentor/my-courses');
          }}
        />
      )}
    </MentorLayout>
  );
};

export default EditLecture;
