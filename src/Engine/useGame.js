import { useEffect, useState } from "react"

const useGame = () => {
    useEffect(()=>console.log('create'),[])
    const [ isEnd, setEnd ] = useState(false)  
    const listen = (player, obstacles) => {
        if(obstacles.reduce((hit, obs) => {
            if(player.x+player.width > obs.x && player.x < obs.x+obs.w && player.y < obs.h) return true
            return hit
        },false)) {
            player.stopRun()
            alert('GAME OVER\ntotal score: '+Math.round(player.x/25))
            player.restart()
        }
    }
    return {isEnd, listen}
}

export default useGame