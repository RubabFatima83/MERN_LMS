import React from 'react'
import Navbar from '../../components/Home/Navbar'
import HeroSection from '../../components/Home/HeroSection'
import CourseSection from '../../components/Home/CourseSection'
import About from './About'
import Footer from '../../components/Home/Footer'
import FeaturesSection from '../../components/Home/FeaturesSection'
import CallToAction from '../../components/Home/CallToAction'
import FaqSection from '../../components/Home/FaqSection'
import Contact from './Contact'
import SubscriptionPage from '../Subscription/SubscriptionPage'

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CourseSection />
      <About />
      <FeaturesSection />
      <CallToAction />
      <SubscriptionPage />
      <FaqSection />
      <Contact />
      <Footer />
    </>
  )
}

export default Home
