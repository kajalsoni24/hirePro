import  { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppSelector';
import { addJob, updateJob, deleteJob } from '../store/slices/jobsSlice';
import JobCard from '../components/JobCard';
import { Job } from '../types';

export default function Jobs() {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(state => state.jobs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const handleSaveJob = (job: Partial<Job>) => {
    if (editingJob) {
      dispatch(updateJob({ ...editingJob, ...job }));
    } else {
      dispatch(addJob({
        id: crypto.randomUUID(),
        title: job.title!,
        description: job.description!,
        status: job.status || 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        candidateCount: 0,
      }));
    }
    setIsModalOpen(false);
    setEditingJob(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Job
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEdit={(job) => {
              setEditingJob(job);
              setIsModalOpen(true);
            }}
            onDelete={(id) => dispatch(deleteJob(id))}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full animate-fade-in">
            <h2 className="text-lg font-medium mb-4">
              {editingJob ? 'Edit Job' : 'Add New Job'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleSaveJob({
                  title: formData.get('title') as string,
                  description: formData.get('description') as string,
                  status: formData.get('status') as Job['status'],
                });
                setIsModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={editingJob?.title}
                  required
                  className="input-field mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  defaultValue={editingJob?.description}
                  required
                  className="input-field mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  defaultValue={editingJob?.status || 'active'}
                  className="input-field mt-1"
                >
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingJob(null);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}