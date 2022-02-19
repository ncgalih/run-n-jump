import { useState } from "react"

const useGame = () => {
    const [ isEnd, setEnd ] = useState(false)  
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
                alert('GAME OVER\ntotal score: '+Math.round(player.x/25))
                resetObs()
                player.restart() 
                setEnd(false)
            }
            
        }
    }
    return {isEnd, listen}
}

export default useGame