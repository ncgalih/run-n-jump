import { useEffect } from "react"
import useBuilding from "../Engine/useBuilding"
import Building from "./Building"

const Background = ({player_x}) => {
    const {buildings, addBuilding} = useBuilding()
    useEffect(()=>{
        const body_w = document.body.clientWidth
        if((buildings[buildings.length-1].x-player_x/16)<body_w+100) addBuilding()
    })
    return(
        <>
        <div className="buildings">
            tes
            {buildings.map((building, key)=>{
                return <Building {...building} x={building.x - player_x/16} key={key} />}
            )}
        </div>
        </>
    )
}

export default Background