import { useEffect, useState, useRef } from "react";


export default function useHover(ref) {
    const [isHovering, setIsHovering] = useState(false)

    const on = () => setIsHovering(true)
    const off = () => setIsHovering(false)


    useEffect( () => {
        if (!ref.current) {
            return
        }

        const node = ref.current

        node.addEventListener('mouseenter', on)
        node.addEventListener('mousmove', on)
        node.addEventListener('mouseleave', off)

        return () => {
            node.removeEventListener('mouseenter', on)
            node.removeEventListener('mousmove', on)
            node.removeEventListener('mouseleave', off)
        }

    }, [])

    return isHovering
}