import { useRef, useState } from "react"

const usePlayer = () => {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const jump_velocity = (t) => t*4
    const gravity = (t) => t*t*9.8/2
    const run_velocity = (t) => t*4
    const scale = 140

    //Jump
    const jumpStart = useRef(null)
    const jumpRef = useRef()
    let isJumping = false
    let y_jump = 0
    const jump = () => {
        jumpRef.current = requestAnimationFrame(jumping)
    }
    const jumping = (timestamp) => {
        if(jumpStart.current===null) jumpStart.current = timestamp 
        const t = (timestamp - jumpStart.current)/1000
        y_jump = Math.max((jump_velocity(t)-gravity(t))*scale,0)
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

    //Run 
    const runRef = useRef()
    let isRunning = false
    let x_run = 0
    let t_prevRun = null
    let direction = 'right'
    const run = (direct) => {
        if(isRunning) return
        console.log('start')
        direction = direct
        isRunning = true
        runRef.current = requestAnimationFrame(running)
    }
    const running = (timestamp) => {
        if(t_prevRun===null) t_prevRun=timestamp
        const t = (timestamp - t_prevRun)/1000
        x_run = run_velocity(t)*scale
        if(direction==='right') setX(prevX=>prevX+x_run)
        else setX(prevX=>prevX-x_run)
        t_prevRun = timestamp
        runRef.current = requestAnimationFrame(running)
    }
    const stopRun = () => {
        cancelAnimationFrame(runRef.current)
        console.log('stop')
        isRunning = false
        t_prevRun = null
    }
    

    return {x,y, jump, run, stopRun, isRunning, isJumping}
}

export default usePlayer