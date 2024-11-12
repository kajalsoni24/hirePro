import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Assessment, Question } from '../types';

interface AssessmentFormProps {
  jobId: string;
  assessment?: Assessment | null;
  onSave: (assessment: Omit<Assessment, 'id'>) => void;
}

export default function AssessmentForm({
  jobId,
  assessment,
  onSave,
}: AssessmentFormProps) {
  const [title, setTitle] = useState(assessment?.title ?? '');
  const [questions, setQuestions] = useState<Omit<Question, 'id' | 'jobId'>[]>(
    assessment?.questions.map(({ text, options, correctOption }) => ({
      text,
      options,
      correctOption,
    })) ?? []
  );

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', options: ['', '', '', ''], correctOption: 0 },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (
    index: number,
    field: keyof Question,
    value: string | number | string[]
  ) => {
    setQuestions(
      questions.map((q, i) =>
        i === index ? { ...q, [field]: value } : q
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      jobId,
      title,
      questions: questions.map((q) => ({ ...q, jobId, id: crypto.randomUUID() })),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Assessment Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div className="space-y-4">
        {questions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="border border-gray-200 rounded-lg p-4 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Question {qIndex + 1}
                </label>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) =>
                    updateQuestion(qIndex, 'text', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => removeQuestion(qIndex)}
                className="ml-4 text-red-600 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={question.correctOption === oIndex}
                    onChange={() =>
                      updateQuestion(qIndex, 'correctOption', oIndex)
                    }
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    required
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...question.options];
                      newOptions[oIndex] = e.target.value;
                      updateQuestion(qIndex, 'options', newOptions);
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={`Option ${oIndex + 1}`}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={addQuestion}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Question
        </button>

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Assessment
        </button>
      </div>
    </form>
  );
}