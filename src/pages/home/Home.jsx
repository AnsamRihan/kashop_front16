import Categories from '@/components/Home/Categories'
import CategoryPromotions from '@/components/Home/CategoryPromotions'
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
      <CategoryPromotions />
      <Products />
      <Features />
      <NewArrivals />
    </>
  )
}
