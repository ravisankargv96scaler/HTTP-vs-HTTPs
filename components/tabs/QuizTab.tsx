import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../constants';
import { Button } from '../ui/Button';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';

export const QuizTab: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctAnswer) newScore++;
    });
    setScore(newScore);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="h-full max-w-2xl mx-auto flex flex-col justify-center">
      {!submitted ? (
        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Test Your Knowledge</h2>
            <p className="text-slate-400">Select the correct answer for each question.</p>
          </div>

          {QUIZ_QUESTIONS.map((q) => (
            <div key={q.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-medium text-slate-200 mb-4">{q.id}. {q.question}</h3>
              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(q.id, idx)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      answers[q.id] === idx 
                        ? 'bg-cyan-900/50 border-cyan-500 text-cyan-100' 
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <Button 
            onClick={handleSubmit} 
            className="w-full" 
            disabled={Object.keys(answers).length !== QUIZ_QUESTIONS.length}
          >
            Submit Answers
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-8 animate-in zoom-in duration-300">
          <div className="bg-slate-800 p-10 rounded-2xl border border-slate-700 shadow-2xl">
            <div className="inline-block p-4 bg-emerald-900/50 rounded-full mb-4">
              <Trophy size={64} className="text-emerald-400" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h2>
            <p className="text-xl text-slate-400 mb-8">
              You scored <span className="text-emerald-400 font-bold">{score}</span> out of {QUIZ_QUESTIONS.length}
            </p>

            <div className="text-left space-y-4 mb-8">
              {QUIZ_QUESTIONS.map(q => {
                const isCorrect = answers[q.id] === q.correctAnswer;
                return (
                  <div key={q.id} className={`p-4 rounded-lg border ${isCorrect ? 'border-emerald-500/50 bg-emerald-900/20' : 'border-rose-500/50 bg-rose-900/20'}`}>
                    <div className="flex items-start gap-3">
                      {isCorrect ? <CheckCircle className="text-emerald-500 mt-1 shrink-0" /> : <XCircle className="text-rose-500 mt-1 shrink-0" />}
                      <div>
                        <p className="text-slate-200 font-medium">{q.question}</p>
                        <p className={`text-sm mt-1 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isCorrect ? 'Correct!' : `Wrong. Correct: ${q.options[q.correctAnswer]}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <Button onClick={handleRetry} className="w-full">Try Again</Button>
          </div>
        </div>
      )}
    </div>
  );
};
