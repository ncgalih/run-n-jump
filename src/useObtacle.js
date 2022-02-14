import { useState } from "react"
import createObstacle from "./Engine/createObstacle"
import generateColor from "./Engine/function/generateColor"

const useObstacle = () => {
    const [obstacles, setObs] = useState([1000, 1400, 1800, 2400].map(pos=>createObstacle(pos, 50, 50)))
    const addObstacle = () => { //generate obstacle
        const distance = Math.floor(Math.random()*600+400)
        const height = Math.floor(Math.random()*50+30)
        const width = Math.floor(Math.random()*70+20)
        console.log(distance)
        const obs = [...obstacles]
        if(obs.length>6) obs.splice(0,1)
        obs.push(createObstacle(obstacles[obstacles.length-1].x+distance, width, height, generateColor()))
        setObs(obs)
        return console.log(obstacles)
    }
    const resetObs = () => setObs([1000, 1400, 1800, 2400].map(pos=>createObstacle(pos, 50, 50)))
    return [obstacles, addObstacle, resetObs]
}

export default useObstacle