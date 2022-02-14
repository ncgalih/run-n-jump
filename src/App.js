import { useEffect } from 'react';
import './App.css';
import usePlayer from './Engine/usePlayer';

function App() {
  const player = usePlayer()
  useEffect(()=>{
    document.addEventListener('keydown',(e)=>{
      if(e.key==='ArrowUp'||e.key===' ') if(!player.isJumping) player.jump()
      if(e.key==='ArrowRight') {
        if(!player.isRunning) player.run('right')
      }
      if(e.key==='ArrowLeft') {
        if(!player.isRunning) player.run('left')
      }
    })
    document.addEventListener('keyup', (e)=> {
      if(e.key==='ArrowRight'||e.key==='ArrowLeft') player.stopRun()
    })
    return () => document.removeEventListener()
  }, [])
  return (
    <div className="canvas">
      <div className='player' onClick={()=>player.jump()} style={{
        left: player.x,
        bottom: player.y
      }}>
        {player.y}
      </div>
        <p>score: {player.x}</p>
    </div>
  );
}

export default App;
