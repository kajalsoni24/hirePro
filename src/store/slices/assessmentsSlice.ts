import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Assessment } from '../../types';

const initialAssessments: Assessment[] = [];

const assessmentsSlice = createSlice({
  name: 'assessments',
  initialState: initialAssessments,
  reducers: {
    addAssessment: (state, action: PayloadAction<Assessment>) => {
      state.push(action.payload);
    },
    updateAssessment: (state, action: PayloadAction<Assessment>) => {
      const index = state.findIndex(assessment => assessment.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteAssessment: (state, action: PayloadAction<string>) => {
      return state.filter(assessment => assessment.id !== action.payload);
    },
  },
});

export const { addAssessment, updateAssessment, deleteAssessment } = assessmentsSlice.actions;
export default assessmentsSlice.reducer;