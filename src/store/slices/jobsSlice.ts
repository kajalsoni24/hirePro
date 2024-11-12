import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Job } from '../../types';

const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    description: 'We are seeking an experienced Full Stack Developer to join our growing team. The ideal candidate will have strong expertise in React, Node.js, and cloud technologies.',
    status: 'active',
    createdAt: '2024-03-01T08:00:00Z',
    updatedAt: '2024-03-01T08:00:00Z',
    candidateCount: 2
  },
  {
    id: '2',
    title: 'DevOps Engineer',
    description: 'Looking for a skilled DevOps Engineer to help us build and maintain our cloud infrastructure.',
    status: 'active',
    createdAt: '2024-02-28T10:00:00Z',
    updatedAt: '2024-02-28T10:00:00Z',
    candidateCount: 2
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    description: 'Join our design team to create beautiful and intuitive user interfaces.',
    status: 'active',
    createdAt: '2024-02-25T09:00:00Z',
    updatedAt: '2024-02-25T09:00:00Z',
    candidateCount: 4
  }
];

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: initialJobs,
  reducers: {
    addJob: (state, action: PayloadAction<Job>) => {
      state.push(action.payload);
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      const index = state.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
      }
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      return state.filter(job => job.id !== action.payload);
    },
  },
});

export const { addJob, updateJob, deleteJob } = jobsSlice.actions;
export default jobsSlice.reducer;