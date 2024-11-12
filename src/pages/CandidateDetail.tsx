import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, FileText } from 'lucide-react';
import { useAppSelector } from '../hooks/useAppSelector';

export default function CandidateDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const candidate = useAppSelector(state => 
    state.candidates.find(c => c.id === id)
  );
  const job = useAppSelector(state => 
    candidate ? state.jobs.find(j => j.id === candidate.jobId) : null
  );

  if (!candidate || !job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Candidate not found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Go back
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center text-indigo-600 hover:text-indigo-500"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to candidates
      </button>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
          <p className="text-sm text-gray-500">Applied for: {job.title}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-3">
              <p className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                {candidate.email}
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                {candidate.phone}
              </p>
              <p className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                Applied {new Date(candidate.appliedAt).toLocaleDateString()}
              </p>
              <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
              >
                <FileText className="h-5 w-5 mr-2" />
                View Resume
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  {skill}
                </span>
              ))}
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-4">
              Experience
            </h2>
            <p className="text-gray-600">{candidate.experience}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Application Status
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  candidate.status === 'hired'
                    ? 'bg-green-100 text-green-800'
                    : candidate.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {candidate.status.replace('_', ' ').toUpperCase()}
              </span>
              <span className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}