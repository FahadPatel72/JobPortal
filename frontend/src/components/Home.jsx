import React, { useEffect } from 'react'
import { Navbar } from './shared/Navbar'
import { HeroSection } from './HeroSection'
import { CategoryCarousel } from './CategoryCarousel.JSX'
import { LatestJobs } from './LatestJobs'
import { Footer } from './shared/Footer'
import { useGetAllJobs } from '../hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



export const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);

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

