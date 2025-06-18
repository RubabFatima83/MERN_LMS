import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import api from '../../auth/Services/api';

const PrivacyPolicy = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolicies = async () => {
    try {
      const res = await api.get('/privacy/get');
      setPolicies(res.data || []);
    } catch (err) {
      console.error(err);
      setPolicies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#01133d] text-gray-100 px-6 py-12 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-white text-center">Privacy Policy</h1>

          <p>
            StudentSphere values your privacy. This Privacy Policy explains how we collect, use, and
            protect your information.
          </p>

          {loading ? (
            <p className="text-center text-gray-300">Loading terms...</p>
          ) : policies.length === 0 ? (
            <p className="text-center text-gray-400">No terms available at the moment.</p>
          ) : (
            <div className="space-y-10">
              {policies.map((policy) => (
                <section key={policy._id}>
                  <h2 className="text-xl font-semibold text-blue-400 mb-2">{policy.title}</h2>
                  <p className="whitespace-pre-line text-gray-300">{policy.content}</p>
                </section>
              ))}
            </div>
          )}

          <p className="text-sm text-gray-400 mt-10 text-center">
            By using StudentSphere, you consent to this Privacy Policy. Updates will be posted on
            this page.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
