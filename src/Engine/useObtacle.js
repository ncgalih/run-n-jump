import { useState } from "react"
import createObstacle from "./createObstacle"
import generateColor from "./function/generateColor"

const useObstacle = () => {
    const [obstacles, setObs] = useState([1000, 1600, 2200].map(pos=>createObstacle(pos, 50, 50)))
    const addObstacle = () => { //generate obstacle
        const distance = Math.floor(Math.random()*600+400)
        const height = Math.floor(Math.random()*50+30)
        const width = Math.floor(Math.random()*70+20)
        const obs = [...obstacles]
        if(obs.length>6) obs.splice(0,1)
        obs.push(createObstacle(obstacles[obstacles.length-1].x+distance, width, height, generateColor()))
        setObs(obs)
    }
    const resetObs = () => setObs([1000, 1600, 2200].map(pos=>createObstacle(pos, 50, 50)))
    return [obstacles, addObstacle, resetObs]
}

export default useObstacle