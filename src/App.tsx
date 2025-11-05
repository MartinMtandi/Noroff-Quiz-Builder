import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from '@/pages/Index'
import Layout from '@/components/layout/Index'
import QuizPreview from './components/QuizPreview'
export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz-preview" element={<QuizPreview />} />
          {/* additional routes go here */}
        </Routes>
      </Layout>
    </Router>
  )
}
