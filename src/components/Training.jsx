import Exercise from './Exercise';

const Training = ({ choose, setChoose }) => {
  const workouts = [
    ['Грудь, Трицепс', 1],
    ['Спина, Бицепс', 2],
    ['Ноги, Ягодицы', 3],
  ];

  // Упражнения с подходами и повторениями
  const exercisesData = {
    1: [
      { name: 'Отжимания', sets: [{ reps: 12, sets: 4 }] },
      { name: 'Отжимания от стула для трицепсов', sets: [{ reps: 15, sets: 3 }] },
      { name: 'Планка', sets: [{ reps: 30, sets: 3 }] },
    ],
    2: [
      { name: 'Супермен', sets: [{ reps: 15, sets: 3 }] },
      { name: 'Подтягивания к полотенцу (если возможно)', sets: [{ reps: 8, sets: 3 }] },
      { name: 'Планка на предплечьях', sets: [{ reps: 30, sets: 3 }] },
    ],
    3: [
      { name: 'Приседания', sets: [{ reps: 15, sets: 4 }] },
      { name: 'Выпады на каждую ногу', sets: [{ reps: 15, sets: 3 }] },
      { name: 'Ягодичный мостик', sets: [{ reps: 20, sets: 4 }] },
    ],
  };

  const selectedExercises = exercisesData[choose] || [];

  return (
    <>
      {choose === 0 && (
        <div className="flex flex-col items-center pt-36 gap-5 mb-5">
          <h2 className="text-xl font-bold">Выбрать тренировку</h2>
          <ul className="flex flex-col items-center gap-5">
            {workouts.map(([plan, number]) => (
              <li
                key={number}
                className="w-80 h-12 flex items-center justify-center border-2 border-cyan-500 rounded-lg text-lg cursor-pointer"
                onClick={() => setChoose(number)}
              >
                {plan}
              </li>
            ))}
          </ul>
        </div>
      )}
      {choose !== 0 && (
        <Exercise exercises={selectedExercises} onBack={() => setChoose(0)} />
      )}
    </>
  );
};

export default Training;
