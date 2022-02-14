import { useEffect } from 'react';
import './App.css';
import createObstacle from './Engine/createObstacle';
import useGame from './Engine/useGame';
import usePlayer from './Engine/usePlayer';
import useObstacle from './useObtacle';

function App() {
  const player = usePlayer(50,50)
  const obstacles = useObstacle()
  const game = useGame()
  useEffect(()=>{
    game.listen(player,obstacles)
  })
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
  const paddingLeft = 80
  return (
    <div className="canvas">
      <div className='player' onClick={()=>player.jump()} style={{
        bottom: player.y,
        left: paddingLeft,
        height: player.height,
        width: player.width
      }}>
        {player.y}
      </div>
      {obstacles.map(obs=>
        <div className='obstacle' style={{
          left: obs.x - player.x + paddingLeft,
          bottom: 0,
          height: obs.h,
          width: obs.w
        }}>
        </div>)}

        <p>score: {Math.round(player.x/25) }</p>
    </div>
  );
}

export default App;
