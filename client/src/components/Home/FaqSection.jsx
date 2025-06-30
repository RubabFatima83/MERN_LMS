import React, { useState, useEffect } from 'react';
import api from '../../auth/Services/api';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const FaqSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const fetchFaqs = async () => {
    try {
      const res = await api.get('/faqs/get');
      setFaqs(res.data);
    } catch (err) {
      toast.error('Failed to load FAQs');
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="bg-[#001845] text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl text-center mb-10 font-extrabold tracking-wide">
          Frequently Asked <span className="text-[#65a0ff]">Questions</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#012465] rounded-lg p-4 sm:p-5 shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start sm:items-center gap-4">
                <h3 className="text-base sm:text-lg font-semibold flex-1">{faq.question}</h3>
                <button
                  onClick={() => toggle(idx)}
                  className="w-8 h-8 flex-shrink-0 rounded-full border border-blue-400 text-blue-400 flex items-center justify-center text-lg hover:bg-blue-400 hover:text-white transition"
                >
                  {openIndex === idx ? '−' : '+'}
                </button>
              </div>

              {/* Answer with animation */}
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p className="mt-3 text-gray-300 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
