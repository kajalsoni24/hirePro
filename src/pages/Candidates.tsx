import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppSelector';
import { updateCandidate } from '../store/slices/candidatesSlice';
import CandidateList from '../components/CandidateList';
import { Candidate } from '../types';

export default function Candidates() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const job = useAppSelector(state => state.jobs.find(j => j.id === jobId));
  const candidates = useAppSelector(state => 
    state.candidates.filter(c => c.jobId === jobId)
  );

  const handleStatusChange = (id: string, status: Candidate['status']) => {
    const candidate = candidates.find(c => c.id === id);
    if (candidate) {
      dispatch(updateCandidate({ ...candidate, status }));
    }
  };

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Job not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to jobs
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to jobs
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          Candidates for {job.title}
        </h1>
        <p className="text-gray-500 mt-1">
          {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} applied
        </p>
      </div>
      <CandidateList
        candidates={candidates}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}