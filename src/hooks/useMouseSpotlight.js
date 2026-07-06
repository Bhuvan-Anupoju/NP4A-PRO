import { useEffect, useRef } from 'react'

export function useMouseSpotlight() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const followerPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    const animateFollower = () => {
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.12
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.12
      follower.style.left = `${followerPos.current.x}px`
      follower.style.top = `${followerPos.current.y}px`
      rafRef.current = requestAnimationFrame(animateFollower)
    }

    const onMouseEnterLink = () => {
      cursor.classList.add('hover')
      follower.classList.add('hover')
    }

    const onMouseLeaveLink = () => {
      cursor.classList.remove('hover')
      follower.classList.remove('hover')
    }

    document.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(animateFollower)

    const addLinkListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
    }

    addLinkListeners()
    const observer = new MutationObserver(addLinkListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return { cursorRef, followerRef }
}
