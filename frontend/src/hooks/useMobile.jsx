import React , {useEffect, useState}from "react"

const useMobile = (breakpoint = 768 ) =>{

    const [isMobile , setIsMObile] = useState(window.innerWidth < breakpoint);

    const handleResize = () =>{

        const checkpoint = window.innerWidth <breakpoint
        setIsMObile(checkpoint)
    }

    useEffect(()=>{
        handleResize()
        window.addEventListener('resize' , handleResize)

        return () =>{
            window.removeEventListener('resize' , handleResize)

        }

    },[])

return [isMobile]
}

export default useMobile