import { useEffect } from 'react';
import './App.css';
import useGame from './Engine/useGame';
import usePlayer from './Engine/usePlayer';
import useObstacle from './Engine/useObtacle';
import Background from './View/Background';
import InfoBar from './View/InfoBar';
import useSky from './Engine/useSky';

function App() {
  const player = usePlayer(50,50)
  const [obstacles, addObstacle, resetObs] = useObstacle()
  const game = useGame()
  const sky = useSky()
  useEffect(()=>{
    game.listen(player, obstacles, resetObs)
  })
  useEffect(()=>{
    if(player.x>obstacles[obstacles.length-3].x) addObstacle()
  })
  
  useEffect(()=>{
    const handleKeyDown = (e)=>{
      if(e.key==='ArrowUp'||e.key===' '){ 
        if(!player.isRunning) player.run()
        else if(!player.isJumping) player.jump()
      }
      if(e.key==='ArrowRight') {
        if(!player.isRunning) player.run()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })
  const paddingLeft = 80
  return (
    <>
    <div className="canvas day" style={{
      backgroundImage: sky.bg
    }}>
      <div className='player' onClick={()=>player.jump()} style={{
        bottom: player.y,
        left: paddingLeft,
        height: player.height,
        width: player.width,
        opacity: player.immune? '50%' : '100%'
      }}>
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
      <Background player_x={player.x} />
      <InfoBar player={player} />
    </div>
    <div className='floor'></div>
    </>
  );
}

export default App;
