import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Mail, Phone, Calendar } from 'lucide-react';
import { Candidate } from '../types';

interface CandidateListProps {
  candidates: Candidate[];
  onStatusChange: (id: string, status: Candidate['status']) => void;
}

export default function CandidateList({
  candidates,
  onStatusChange,
}: CandidateListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          className="p-6 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <Link
                  to={`/candidates/${candidate.id}`}
                  className="text-lg font-medium text-gray-900 hover:text-indigo-600"
                >
                  {candidate.name}
                </Link>
                <select
                  value={candidate.status}
                  onChange={(e) =>
                    onStatusChange(
                      candidate.id,
                      e.target.value as Candidate['status']
                    )
                  }
                  className="ml-4 rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="new">New</option>
                  <option value="under_review">Under Review</option>
                  <option value="interview_scheduled">Interview Scheduled</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4 flex-wrap">
                <span className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {candidate.email}
                </span>
                <span className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {candidate.phone}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Applied {new Date(candidate.appliedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-2">
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="ml-4">
              <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
              >
                <FileText className="h-5 w-5 mr-1" />
                View Resume
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}