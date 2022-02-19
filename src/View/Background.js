import { useEffect } from "react"
import useBuilding from "../Engine/useBuilding"
import Building from "./Building"

const Background = ({player_x}) => {
    const {buildings, addBuilding, destroyBuilding, reset} = useBuilding()
    useEffect(()=>{
        const body_w = document.body.clientWidth
        if((buildings[buildings.length-1].x-player_x/16)<body_w+100) addBuilding()
        if((buildings[0].x+120)<player_x/16) destroyBuilding()
        if((buildings[0].x>30)&&player_x===0) reset()
    })
    return(
        <>
        <div className="buildings">
            {buildings.map((building, key)=>{
                return <Building {...building} x={building.x - player_x/16} key={key} />}
            )}
        </div>
        </>
    )
}

export default Background