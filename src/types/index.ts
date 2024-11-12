export type JobStatus = 'active' | 'closed' | 'draft';
export type CandidateStatus = 'new' | 'under_review' | 'interview_scheduled' | 'rejected' | 'hired';

export interface Job {
  id: string;
  title: string;
  description: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  candidateCount: number;
}

export interface Candidate {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  status: CandidateStatus;
  resumeUrl: string;
  appliedAt: string;
  skills: string[];
  experience: string;
}

export interface Question {
  id: string;
  jobId: string;
  text: string;
  options: string[];
  correctOption: number;
}

export interface Assessment {
  id: string;
  jobId: string;
  title: string;
  questions: Question[];
}