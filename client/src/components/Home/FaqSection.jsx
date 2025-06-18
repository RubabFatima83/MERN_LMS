import React, { useState, useEffect } from 'react';
import api from '../../auth/Services/api';
import { toast } from 'react-toastify'

const FaqSection = () => {
  const [faqs, setFaqs] = useState([])
  const [openIndex, setOpenIndex] = useState(null);

  const fetchFaqs = async () => {
    try {
      const res = await api.get('/faqs/get')
      setFaqs(res.data)
    } catch (err) {
      toast.error('Failed to load FAQs')
    }
  }

  useEffect(() => {
    fetchFaqs()
  }, [])

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id='faqs' className="bg-[#001845] text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl text-center mb-10 font-extrabold tracking-wide">Frequently Asked <span className="text-[#65a0ff]">Questions</span></h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#012465] rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <button
                  onClick={() => toggle(idx)}
                  className="w-8 h-8 rounded-full border border-blue-400 text-blue-400 flex items-center justify-center text-xl hover:bg-blue-400 hover:text-white transition"
                >
                  {openIndex === idx ? '−' : '+'}
                </button>
              </div>
              {openIndex === idx && (
                <p className="mt-3 text-gray-300 text-sm transition-opacity duration-300 ease-in-out">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
