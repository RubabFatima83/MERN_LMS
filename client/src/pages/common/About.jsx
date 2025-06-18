import React from 'react';
import { motion } from 'framer-motion';
import about from '../../assets/about.png';
import girl from '../../assets/girl.png';
import boy from '../../assets/boy.png';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const AboutPage = () => {
  return (
    <div id="about" className="min-h-screen bg-[#01133d] text-gray-100 py-16 px-6 md:px-20 space-y-24">
      {/* Intro */}
      <motion.section
        className="max-w-5xl mx-auto space-y-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={1}
      >
        <h1 className="text-5xl font-bold text-white">About StudentSphere</h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          StudentSphere is a collaborative learning platform connecting students with mentors and empowering them through knowledge, real-world projects, and a strong academic network.
        </p>
      </motion.section>

      {/* What We Offer */}
      <motion.section
        className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={2}
      >
        <motion.img
          src={about}
          alt="Collaborative learning illustration"
          className="w-full h-auto aspect-video object-cover rounded-xl shadow-lg"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        />
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Mentor-led, project-based courses</li>
            <li>Assignments, announcements, and student dashboards</li>
            <li>Secure login and role-based access</li>
            <li>Mentor-student communication tools</li>
            <li>Admin analytics and reporting</li>
          </ul>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="max-w-6xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={3}
      >
        <h2 className="text-4xl font-bold mb-12 text-white">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-10 px-4">
          {[
            {
              name: "Rubab Fatima",
              role: "Full Stack Developer",
              img: girl,
            },
            {
              name: "John Doe",
              role: "UI/UX Designer",
              img: boy,
            },
            {
              name: "Ayesha Ali",
              role: "Backend Developer",
              img: girl,
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-[#012465] p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                src={member.img}
                alt={`${member.name} - ${member.role}`}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-white"
              />
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="text-sm text-gray-300">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
