import { useRef, useState } from "react"

const usePlayer = (width, height) => {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [life, setLife] = useState(3)
    const [immune, setImunne] = useState(false)

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
        setLife(3)
        setX(0)
        setY(0)
    }

    const [opacity, setOpacity] = useState(100)
    const blinkRef = useRef()
    const blinkStart = useRef(null)
    const hit = () => {
        setImunne(true)
        setLife(prevLive => prevLive-1)
        blinkRef.current = requestAnimationFrame(blinking)
        setTimeout(()=>{
            setImunne(false)
            blinkStart.current = null
            setOpacity(100)
            cancelAnimationFrame(blinkRef.current)
        }, 2000)
    }
    const blinking = (t) => {
        if(blinkStart.current===null) blinkStart.current = t
        const t_count = Math.round((t - blinkStart.current)/125)
        if(t_count%2===0) setOpacity(0)
        else setOpacity(50)
        blinkRef.current = requestAnimationFrame(blinking)
    }

    return {x,y, jump, run, stopRun, restart, hit, isRunning, isJumping, height, width, life, immune, opacity}
}

export default usePlayer