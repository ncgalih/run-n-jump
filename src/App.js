import { useEffect } from 'react';
import './App.css';
import useGame from './Engine/useGame';
import usePlayer from './Engine/usePlayer';
import useObstacle from './useObtacle';

function App() {
  const player = usePlayer(50,50)
  const [obstacles, addObstacle, resetObs] = useObstacle()
  const game = useGame()
  useEffect(()=>{
    game.listen(player, obstacles, resetObs)
  })
  useEffect(()=>{
    if(player.x>obstacles[obstacles.length-3].x) addObstacle()
  })
  
  useEffect(()=>{
    const handleKeyDown = (e)=>{
      if(e.key==='ArrowUp'||e.key===' ') if(!player.isJumping) player.jump()
      if(e.key==='ArrowRight') {
        if(!player.isRunning) player.run('right')
      }
      if(e.key==='ArrowLeft') {
        if(!player.isRunning) player.run('left')
        }
      }
    const handleKeyUp = (e)=> {
      if(e.key==='ArrowRight'||e.key==='ArrowLeft') player.stopRun()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
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
      {obstacles.length>0 && obstacles.map((obs, key)=>
        <div className='obstacle' key={key} style={{
          left: obs.x - player.x + paddingLeft,
          bottom: 0,
          height: obs.h,
          width: obs.w,
          backgroundColor: obs.color
        }}>
        </div>)}

        <p>score: {Math.round(player.x/25)}</p>
    </div>
  );
}

export default App;
