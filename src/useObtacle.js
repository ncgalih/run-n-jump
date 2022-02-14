import { useState } from "react"
import createObstacle from "./Engine/createObstacle"

const useObstacle = () => {
    const [obstacles, setObs] = useState([1000, 1400, 1800, 2400].map(pos=>createObstacle(pos,50,50)))
    return obstacles
}

export default useObstacle