import Categories from '@/components/Home/Categories'
import Features from '@/components/Home/Features'
import Hero from '@/components/Home/Hero'
import NewArrivals from '@/components/Home/NewArrivals'
import Products from '@/components/Home/Products'
import React from 'react'

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Products />
      <Features />
      <NewArrivals />
    </>
  )
}
