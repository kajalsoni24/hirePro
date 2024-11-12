import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Candidate } from '../../types';

const initialCandidates: Candidate[] = [
  {
    id: '1',
    jobId: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    status: 'interview_scheduled',
    resumeUrl: 'https://example.com/resumes/sarah-johnson.pdf',
    appliedAt: '2024-03-02T14:30:00Z',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
    experience: '8 years of full-stack development experience'
  },
  {
    id: '2',
    jobId: '1',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    status: 'under_review',
    resumeUrl: 'https://example.com/resumes/michael-chen.pdf',
    appliedAt: '2024-03-03T09:15:00Z',
    skills: ['React', 'Vue.js', 'Python', 'Docker', 'PostgreSQL'],
    experience: '6 years of web development experience'
  },
  {
    id: '3',
    jobId: '3',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    status: 'under_review',
    resumeUrl: 'https://example.com/resumes/michael-chen.pdf',
    appliedAt: '2024-03-03T09:15:00Z',
    skills: ['React', 'Vue.js', 'Python', 'Docker', 'PostgreSQL'],
    experience: '6 years of web development experience'
  },
  {
    id: '4',
    jobId: '2',
    name: 'Michael voo',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    status: 'under_review',
    resumeUrl: 'https://example.com/resumes/michael-chen.pdf',
    appliedAt: '2024-03-03T09:15:00Z',
    skills: ['React', 'Vue.js', 'Python', 'Docker', 'PostgreSQL'],
    experience: '6 years of web development experience'
  }
  

];

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState: initialCandidates,
  reducers: {
    addCandidate: (state, action: PayloadAction<Candidate>) => {
      state.push(action.payload);
    },
    updateCandidate: (state, action: PayloadAction<Candidate>) => {
      const index = state.findIndex(candidate => candidate.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteCandidate: (state, action: PayloadAction<string>) => {
      return state.filter(candidate => candidate.id !== action.payload);
    },
  },
});

export const { addCandidate, updateCandidate, deleteCandidate } = candidatesSlice.actions;
export default candidatesSlice.reducer;