import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy load pages
const Jobs = React.lazy(() => import('./pages/Jobs'));
const Candidates = React.lazy(() => import('./pages/Candidates'));
const CandidateDetail = React.lazy(() => import('./pages/CandidateDetail'));
const Assessments = React.lazy(() => import('./pages/Assessments'));


function App() {
  return (
    <Router>
      <Layout>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Jobs />} />
          
            <Route path="/jobs/:jobId/candidates" element={<Candidates />} />
            <Route path="/candidates/:id" element={<CandidateDetail />} />
            <Route path="/assessments" element={<Assessments />} />
          </Routes>
        </React.Suspense>
      </Layout>
    </Router>
  );
}

export default App;