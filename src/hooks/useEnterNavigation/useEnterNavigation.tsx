import { useEffect, RefObject } from 'react'

type InputRef = RefObject<HTMLInputElement | null>

function useEnterNavigation(inputs: InputRef[], onSubmit: () => void) {
  useEffect(() => {
    const handleEnterKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const currentIndex = inputs.findIndex((input) => document.activeElement === input.current)
        if (currentIndex !== -1) {
          e.preventDefault()
          if (currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].current?.focus()
          } else {
            onSubmit()
          }
        }
      }
    }

    inputs.forEach((input) => {
      input.current?.addEventListener('keydown', handleEnterKeyPress)
    })

    return () => {
      inputs.forEach((input) => {
        input.current?.removeEventListener('keydown', handleEnterKeyPress)
      })
    }
  }, [inputs, onSubmit])
}

export default useEnterNavigation
