import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks/useAppSelector';
import { addAssessment, updateAssessment } from '../store/slices/assessmentsSlice';
import AssessmentForm from '../components/AssessmentForm';
import { Assessment } from '../types';

export default function Assessments() {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(state => state.jobs);
  const assessments = useAppSelector(state => state.assessments);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null);

  const handleSaveAssessment = (assessment: Omit<Assessment, 'id'>) => {
    if (editingAssessment) {
      dispatch(updateAssessment({ ...assessment, id: editingAssessment.id }));
      setEditingAssessment(null);
    } else {
      dispatch(addAssessment({ ...assessment, id: crypto.randomUUID() }));
    }
    setIsCreating(false);
    setSelectedJobId('');
  };

  const handleEditAssessment = (assessment: Assessment) => {
    setEditingAssessment(assessment);
    setSelectedJobId(assessment.jobId);
    setIsCreating(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Assessment
          </button>
        )}
      </div>

      {isCreating ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="mb-6">
            <label
              htmlFor="jobId"
              className="block text-sm font-medium text-gray-700"
            >
              Select Job
            </label>
            <select
              id="jobId"
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a job...</option>
              {jobs
                .filter((job) => job.status === 'active')
                .map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
            </select>
          </div>

          {selectedJobId && (
            <AssessmentForm
              jobId={selectedJobId}
              assessment={editingAssessment}
              onSave={handleSaveAssessment}
            />
          )}

          <div className="mt-4">
            <button
              onClick={() => {
                setIsCreating(false);
                setSelectedJobId('');
                setEditingAssessment(null);
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assessments.map((assessment) => {
            const job = jobs.find((j) => j.id === assessment.jobId);
            return (
              <div
                key={assessment.id}
                className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {assessment.title}
                </h3>
                {job && (
                  <p className="text-sm text-gray-500 mt-1">
                    For: {job.title}
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-2">
                  {assessment.questions.length} questions
                </p>
                <button
                  onClick={() => handleEditAssessment(assessment)}
                  className="mt-4 text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Edit Assessment →
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}