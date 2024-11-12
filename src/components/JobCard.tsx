
import {  useNavigate } from 'react-router-dom';
import { Users, Calendar } from 'lucide-react';
import { Job  } from '../types';
import { useAppSelector } from '../hooks/useAppSelector';


interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}
type JobApplicationsCount = Record<string, number>;





export default function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  const navigate = useNavigate();


  const candidates = useAppSelector(state => state.candidates);

const jobApplicationsCount = candidates.reduce<JobApplicationsCount>((acc, candidate) => {
  const { jobId } = candidate;
  acc[jobId] = (acc[jobId] || 0) + 1;
  return acc;
}, {});

  const handleEditClick = () => {
    
    onEdit(job)
  };


  return (
    <div className="group card p-6 hover:border-indigo-100 relative">
      
     

      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
              {job.title}
            </h3>
            <span
              className={`ml-3 badge ${
                job.status === 'active'
                  ? 'badge-success'
                  : job.status === 'closed'
                  ? 'badge-danger'
                  : 'badge-warning'
              }`}
            >
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>{jobApplicationsCount[job.id]} candidates</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>{new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          
          </div>
        </div>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleEditClick}
            className="btn-secondary py-1 px-3"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="btn-secondary py-1 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-600 line-clamp-2">
        {job.description}
      </p>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => navigate(`/jobs/${job.id}/candidates`)}
          className="btn-primary py-1.5"
        >
          View Candidates
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Last updated: {new Date(job.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
