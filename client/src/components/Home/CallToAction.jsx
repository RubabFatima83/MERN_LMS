import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <section className="bg-[#001845] text-white py-16">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-6">
        <h2 className="text-4xl md:text-3xl font-extrabold tracking-wide">
          Start Your <span className="text-[#65a0ff]">Learning</span> Journey Today
        </h2>
        <p className="text-blue-200 text-lg md:text-xl max-w-3xl leading-relaxed">
          Explore a wide variety of courses, connect with mentors, and grow your skills at StudentSphere.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-gradient-to-r from-[#3a86ff] to-[#00ffea] hover:from-[#2f6ddb] hover:to-[#00ccbd] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </section>
  )
}

export default CallToAction
