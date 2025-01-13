import React from 'react'
import { Navbar } from './shared/Navbar'
import { HeroSection } from './HeroSection'
import { CategoryCarousel } from './CategoryCarousel.JSX'
import { LatestJobs } from './LatestJobs'
import { Footer } from './shared/Footer'



export const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

