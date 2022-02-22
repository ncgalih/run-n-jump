import { useState } from "react"

const useGame = () => {
    const [ isEnd, setEnd ] = useState(false)
    const [ highscore, setHighscore ] = useState(0)
    const listen = (player, obstacles, resetObs) => {
        if(player.immune) return
        if(obstacles.reduce((hit, obs) => {
            if(player.x+player.width > obs.x && player.x < obs.x+obs.w && player.y < obs.h) return true
            return hit
        }, false)) {
            console.log(player.life)
            if(player.life > 0) {
                player.hit()
            } else {
                player.stopRun()
                setEnd(true)
                const score = Math.round(player.x/25)
                if(highscore < score){ 
                    setHighscore(score)
                    alert('GAME OVER\nCongrats!!\nNew Highest Score: '+score)
                } else alert('GAME OVER\nTotal Score: '+score)
                resetObs()
                player.restart() 
                setEnd(false)
            }
            
        }
    }
    return {isEnd, highscore, listen}
}

export default useGame