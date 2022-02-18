import { useState } from "react"

const buildingColor = () => {
    const colors = [
         '#111827', '#1f2937', '#111827', '#1f2937', '#111827', '#1f2937', '#374151', '#4b5563'
    ]
    return colors[Math.floor(Math.random()*7)]
}
const getHeight = () => Math.floor(Math.random()*240+40)
const getWidth = () => Math.floor(Math.random()*75+25)
const getDistance = () => Math.floor(Math.random()*50-20)

const createBuilding = (prev_building = {x:0, w:0}) => {
    const h = getHeight()
    const w = getWidth()
    const x = prev_building.x + prev_building.w + getDistance()
    return { h: h, w: w, x: x, color:buildingColor() }
}

const useBuilding = () => {
    const [buildings, setBuilding] = useState([createBuilding()])
    const addBuilding = () => setBuilding([...buildings, createBuilding(buildings[buildings.length-1])])
    const destroyBuilding = () => {
        const temp = [...buildings]
        temp.splice(0,1)
        setBuilding(temp)
    }
    const reset = () => setBuilding([createBuilding()])

    return {buildings, addBuilding, destroyBuilding, reset}
}

export default useBuilding