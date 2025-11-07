import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from '@/pages/Index'
import Layout from '@/components/layout/Index'
import Preview from '@/pages/Preview'

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz-preview" element={<Preview />} />
          {/* additional routes go here */}
        </Routes>
      </Layout>
    </Router>
  )
}
