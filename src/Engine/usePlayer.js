import { useEffect, useRef, useState } from "react"

const usePlayer = (width, height) => {
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
    const jump = () => {
        jumpRef.current = requestAnimationFrame(jumping)
    }
    const jumping = (timestamp) => {
        if(jumpStart.current===null) jumpStart.current = timestamp 
        const t = (timestamp - jumpStart.current)/1000
        const y_jump = Math.max((jump_velocity(t)-gravity(t))*scale,0)
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
    const t_prevRun = useRef(null)
    const [ isRunning, setRun ] = useState(false)
    const run = () => {
        if(!isRunning) {
            console.log('start')
            setRun(true)
            runRef.current = requestAnimationFrame(running)
        }
    }
    const running = (timestamp) => {
        if(t_prevRun.current===null) t_prevRun.current=timestamp
        else {
            console.log('running')
            const dt = (timestamp - t_prevRun.current)/1000
            const dx = run_velocity(dt)*scale
            setX(prevX=>prevX+dx)
            t_prevRun.current = timestamp 
        }
        runRef.current = requestAnimationFrame(running)
    }
    const stopRun = () => {
        cancelAnimationFrame(runRef.current)
        console.log('stop')
        setRun(false)
        t_prevRun.current = null
    }
    const restart = () => {
        setX(0)
        setY(0)
    }

    return {x,y, jump, run, stopRun, restart, isRunning, isJumping, height, width}
}

export default usePlayer