import React, { useState } from 'react';
import axios from 'axios';

const ExerciseDetails = ({ exercise, onClose }) => {
  const [completedSets, setCompletedSets] = useState(
    exercise.sets.map(() => ({ reps: '', sets: '' }))
  );

  // Функция для обработки изменения значений формы
  const handleInputChange = (index, field, value) => {
    const updatedSets = [...completedSets];
    updatedSets[index][field] = value;
    setCompletedSets(updatedSets);
  };

  // Функция для сохранения введенных данных и отправки их на сервер
  const handleSave = async () => {
    const apiUri = 'https://script.google.com/macros/s/AKfycbyDjAyKbdLGjxp5ARNE4YoXT5VmAuBbcTCzXRF0gpdA9GbXNu4GdJa7maIqv0s1NAnMYA/exec';
    const newId = Date.now().toString().slice(-6);
    const date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString(
      [],
      { hour: '2-digit', minute: '2-digit' }
    )}`;

    // Подготовка данных для отправки
    const dataToSubmit = {
      id: newId,
      date: date,
      name: exercise.name, // Название упражнения
      sets: completedSets.map((set) => set.sets), // Количество подходов
      reps: completedSets.map((set) => set.reps)  // Количество повторений
    };

    try {
      const response = await axios.post(apiUri, dataToSubmit, {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      });

      console.log("Данные успешно сохранены:", response.data);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }

    // Закрываем форму после сохранения
    onClose();
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg text-center w-80">
        <h3 className="text-2xl font-bold mb-4">{exercise.name}</h3>
        <ul>
          {exercise.sets.map((set, index) => (
            <li key={index} className="flex flex-col gap-5 mb-4">
              <div className="text-lg">Запланировано: Подходов {set.sets}, Повторений {set.reps}</div>
              <input
                type="number"
                placeholder="Выполненные подходы"
                value={completedSets[index].sets}
                onChange={(e) => handleInputChange(index, 'sets', e.target.value)}
                className="border rounded w-full h-10 px-2 py-1 mt-1"
              />
              <input
                type="number"
                placeholder="Выполненные повторения"
                value={completedSets[index].reps}
                onChange={(e) => handleInputChange(index, 'reps', e.target.value)}
                className="border rounded w-full h-10 px-2 py-1 mt-1"
              />
            </li>
          ))}
        </ul>
        <button
          onClick={handleSave}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg mr-5"
        >
          Сохранить
        </button>
        <button
          onClick={onClose}
          className="mt-2 py-2 px-4 bg-gray-500 text-white rounded-lg"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default ExerciseDetails;
