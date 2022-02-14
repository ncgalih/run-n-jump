import { useEffect } from 'react';
import './App.css';
import usePlayer from './Engine/usePlayer';

function App() {
  const player = usePlayer()
  return (
    <div className="canvas">
      <div className='player' onClick={()=>player.jump()} style={{
        left: player.x,
        bottom: player.y
      }}>
        {player.y}
      </div>
    </div>
  );
}

export default App;
