import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from '@/pages/Index'
import Layout from '@/components/layout/Index'
export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* additional routes go here */}
        </Routes>
      </Layout>
    </Router>
  )
}
