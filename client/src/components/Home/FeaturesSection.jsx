import React from 'react'
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Top Mentors',
    description: 'Learn from industry experts with real-world experience.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-14 text-[#65a0ff]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.14 6.47L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l-6.16-3.422a12.083 12.083 0 00-.14 6.47L12 14z" />
      </svg>
    )
  },
  {
    title: 'Flexible Learning',
    description: 'Access courses anytime, anywhere at your own pace.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-14 text-[#65a0ff]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx={12} cy={12} r={10} strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      </svg>
    )
  },
  {
    title: 'Certification',
    description: 'Receive certifications to boost your career.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-14 text-[#65a0ff]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7v10M17 7v10M7 7l5 5 5-5" />
      </svg>
    )
  }
]

const cardVariants = {
  offscreen: {
    opacity: 0,
    y: 40,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.8,
    },
  },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-[#001845] text-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12 tracking-wide"
        >
          Why Choose <span className="text-[#65a0ff]">StudentSphere?</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-[#012465] p-6 sm:p-8 rounded-3xl shadow-lg cursor-pointer 
                         transform transition duration-300 ease-in-out
                         hover:shadow-xl hover:-translate-y-2 hover:scale-105"
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="mb-5 flex justify-center items-center text-4xl text-[#65a0ff]">
                {feature.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection                     