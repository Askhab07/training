import { useEffect, useState } from 'react';
import axios from 'axios';

const Diary = ({diary, setDiary}) => {
    const [entries, setEntries] = useState([]);

    // Функция для форматирования даты
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    // Функция для загрузки данных из API и обновления `localStorage`
    const fetchEntries = async () => {
        const apiUri = 'https://script.google.com/macros/s/AKfycbyDjAyKbdLGjxp5ARNE4YoXT5VmAuBbcTCzXRF0gpdA9GbXNu4GdJa7maIqv0s1NAnMYA/exec';

        try {
            const response = await axios.get(apiUri);
            const fetchedEntries = response.data;

            // Сравниваем новые данные с данными из localStorage
            const storedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

            // Если данные изменились, обновляем состояние и `localStorage`
            if (JSON.stringify(fetchedEntries) !== JSON.stringify(storedEntries)) {
                setEntries(fetchedEntries);
                localStorage.setItem('diaryEntries', JSON.stringify(fetchedEntries));
            }
        } catch (error) {
            console.error('Ошибка при загрузке тренировок:', error);
        }
    };

    useEffect(() => {
        // Проверка `localStorage` при первой загрузке компонента
        const storedEntries = JSON.parse(localStorage.getItem('diaryEntries'));
        if (storedEntries) {
            setEntries(storedEntries);
        } else {
            fetchEntries(); // Загружаем данные с сервера, если в `localStorage` пусто
        }

        // Запускаем таймер для периодической проверки данных каждые 5 минут
        const interval = setInterval(fetchEntries, 10000); // 300000 ms = 5 минут

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-xl text-center">
            {!diary && <button className='w-80 h-14 rounded-xl bg-sky-500' onClick={() => setDiary(true)}>Мой дневник</button>}
            <ul>
                {diary && entries.map((entry, index) => (
                    <li key={index} className="flex flex-col items-start gap-2 border-b p-5">
                        <div><span className='font-bold'>Дата:</span> {formatDate(entry.date)}</div>
                        <div><span className='font-bold'>Упражнение:</span> {entry.name}</div>
                        <div><span className='font-bold'>Подходы:</span> {entry.sets}</div>
                        <div><span className='font-bold'>Повторения:</span> {entry.reps}</div>
                    </li>
                ))}
            </ul>
            {diary && <button className='w-80 h-14 text-xl py-2 bg-sky-500 text-white rounded-lg mt-5' onClick={() => setDiary(false)}>Назад</button>}
        </div>
    );
};

export default Diary;
