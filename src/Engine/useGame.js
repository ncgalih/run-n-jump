import { useState } from "react"

const useGame = () => {
    const [ isEnd, setEnd ] = useState(false)  
    const listen = (player, obstacles, resetObs) => {
        if(obstacles.reduce((hit, obs) => {
            if(player.x+player.width > obs.x && player.x < obs.x+obs.w && player.y < obs.h) return true
            return hit
        }, false)) {
            player.stopRun()
            alert('GAME OVER\ntotal score: '+Math.round(player.x/25))
            resetObs()
            player.restart()
        }
    }
    return {isEnd, listen}
}

export default useGame