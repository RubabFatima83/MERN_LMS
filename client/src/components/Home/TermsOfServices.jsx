import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import api from '../../auth/Services/api';

const TermsOfService = () => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTerms = async () => {
    try {
      const res = await api.get('/terms/get');
      setTerms(res.data || []);
    } catch (err) {
      console.error(err);
      setTerms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#01133d] text-gray-100 px-6 py-12 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-white text-center">Terms of Service</h1>

          <p>
            By accessing or using StudentSphere, you agree to be bound by these Terms of Service.
            Please read them carefully before using the platform.
          </p>

          {loading ? (
            <p className="text-center text-gray-300">Loading terms...</p>
          ) : terms.length === 0 ? (
            <p className="text-center text-gray-400">No terms available at the moment.</p>
          ) : (
            <div className="space-y-10">
              {terms.map((term) => (
                <section key={term._id}>
                  <h2 className="text-xl font-semibold text-blue-400 mb-2">{term.title}</h2>
                  <p className="whitespace-pre-line text-gray-300">{term.content}</p>
                </section>
              ))}
            </div>
          )}

          <p className="text-sm text-gray-400 mt-10 text-center">
            These terms are subject to change. Continued use of StudentSphere means you accept the updated terms.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
