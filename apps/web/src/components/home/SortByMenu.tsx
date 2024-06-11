import React, { useCallback, useState } from 'react'

const SortByMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])
  return (
    <div>

    </div>
  )
}

export default SortByMenu