import { useState } from 'react';
import Diary from './components/Diary';
import Training from './components/Training';

function App() {
  const [start, setStart] = useState(false);
  const [diary, setDiary] = useState(false);
  const [choose, setChoose] = useState(0);

  const handleStart = () => {
    setStart(true);
  };

  return (
    <div className="w-[375px] min-h-screen mt-0 mx-auto text-white bg-blue-500">
      {!start && (
        <div className="min-h-screen flex items-center justify-center">
          <button
            className="text-2xl font-bold text-white"
            onClick={handleStart}
          >
            Начать тренировку
          </button>
        </div>
      )}
      {start && !diary && (
        <>
          <Training choose={choose} setChoose={setChoose} />
        </>
      )}
      {choose === 0 && start && <Diary diary={diary} setDiary={setDiary} />}
    </div>
  );
}

export default App;
