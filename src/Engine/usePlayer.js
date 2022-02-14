import { useRef, useState } from "react"

const usePlayer = () => {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const velocity = (t) => t*4
    const gravity = (t) => t*t*9.8/2
    const scale = 140

    const jumpStart = useRef(null)
    const jumpRef = useRef()
    let isJumping = false
    let y_jump = 0
    const jump = () => {
        jumpRef.current = requestAnimationFrame(jumping)
    }
    const stoped = false
    const jumping = (timestamp) => {
        if(stoped) return
        if(jumpStart.current===null) jumpStart.current = timestamp 
        const t = (timestamp - jumpStart.current)/1000
        y_jump = Math.max((velocity(t)-gravity(t))*scale,0)
        setY(y_jump)
        if(isJumping && y_jump===0){
            jumpStart.current = null
            isJumping = false
            cancelAnimationFrame(jumpRef.current)
            return
        }
        isJumping = true
        jumpRef.current = requestAnimationFrame(jumping)
    }
    return {x,y, jump}
}

export default usePlayer