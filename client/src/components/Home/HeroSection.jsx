import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import illustration from '../../assets/learning.png'

const HeroSection = () => {
  return (
    <section id='hero' className="relative bg-[#001845] text-white py-28 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16 z-10 relative">
        {/* Left Content */}
        <motion.div
          className="w-full md:w-1/2 space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            <Typewriter
              words={['Empower Your Learning Journey with ']}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #3a86ff, #00ffea)',
              }}
            >
              StudentSphere
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
            Explore expert-led courses, connect with mentors, and grow with a supportive student community built just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              to="/courses"
              className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#3a86ff] to-[#00ffea] hover:from-[#2f6ddb] hover:to-[#00ccbd] transition duration-300 text-center"
            >
              Explore Courses
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 rounded-lg font-medium text-white border border-white/50 hover:border-white hover:bg-white/10 transition duration-300 text-center"
            >
              Join Free
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        >
          <img
            src={illustration}
            alt="Student learning illustration"
            className="w-full max-w-sm sm:max-w-md md:max-w-lg"
          />
        </motion.div>
      </div>

      {/* Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-24"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            fill="url(#gradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
            d="M0,224L48,197.3C96,171,192,117,288,128C384,139,480,213,576,224C672,235,768,181,864,170.7C960,160,1056,192,1152,202.7C1248,213,1344,203,1392,197.3L1440,192L1440,320L0,320Z"
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3a86ff" />
              <stop offset="100%" stopColor="#00ffea" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
