import { useState } from 'react';
import ExerciseDetails from './ExerciseDetails';

const Exercise = ({ exercises, onBack }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <div className="flex flex-col items-center gap-5 pt-10">
      <h2 className="text-xl font-bold">Упражнения</h2>
      <ul className="flex flex-col gap-3">
        {exercises.map((exercise, index) => (
          <li
            key={index}
            className="w-80 text-lg border-b border-gray-300 pb-2 cursor-pointer"
            onClick={() => setSelectedExercise(exercise)}
          >
            {exercise.name}
          </li>
        ))}
      </ul>

      {selectedExercise && (
        <ExerciseDetails
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
      <button
        onClick={onBack}
        className="w-80 h-14 text-xl py-2 bg-sky-500 text-white rounded-lg"
      >
        Назад
      </button>
    </div>
  );
};

export default Exercise;
