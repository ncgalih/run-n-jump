import { useEffect, useRef, useState } from "react"

const createBG = (c) => `linear-gradient(${c[6]}deg, rgb(${c[0]},${c[1]},${c[2]}), rgb(${c[3]},${c[4]},${c[5]}))`
const colorTrans = (before, after, dt) => {
    const delta = after - before
    return before+delta*(dt/3000)
}
const useSky = () => {
    const [day, setDay] = useState(0)
    const [bg, setBg] = useState('linear-gradient(to bottom, rgb(3,105,161), rgb(56,189,248))')
    const skyColor = [
        [56,189,248,3,105,161, 0],
        [194,65,12,251,146,60, -135],
        [8,4,54,6,3,69, 180],
        [7,89,133,245,158,11, 135]
    ]
    const nextTime = () => {
        if(day>6) setDay(0) 
        else setDay(d=>d+1)
    }
    const t_start = useRef(null)
    const trans_ref = useRef(null)
    const transiting = useRef(false)
    const dayTransition = (before, after) => {
        transiting.current = true
        const transition = (t) => {
            if(!transiting.current) return
            if(t_start.current===null) {
                t_start.current=t
                trans_ref.current = requestAnimationFrame(transition)
            } else {
                const dt = t - t_start.current
                if(dt<3000) {
                    setBg(createBG(before.map((b, key)=>colorTrans(b,after[key],dt))))
                    trans_ref.current = requestAnimationFrame(transition)
                } else {
                    t_start.current = null
                    nextTime()
                    cancelAnimationFrame(trans_ref.current)
                    console.log('stop transition')
                    transiting.current = false
                }
            }
        }
        trans_ref.current = requestAnimationFrame(transition)

    }
    useEffect(()=>{
        if(day===7) dayTransition(skyColor[3],skyColor[0])
        else if(day===3){ 
            const after = skyColor[2]
            after[6] = -180
            dayTransition(skyColor[1],after)
        }
        else if(day%2===0) setBg(createBG(skyColor[day/2]))
        else dayTransition(skyColor[(day-1)/2], skyColor[(day+1)/2])
    })
    useEffect(()=>{
        const handler = setInterval(()=>nextTime(), 15000)
        return () => clearInterval(handler)
    }, [])
    return {bg, day}
}

export default useSky