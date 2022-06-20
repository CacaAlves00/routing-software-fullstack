import React, { useEffect, useState, useRef } from 'react'
import useClickOutsideAlert from '../hooks/useClickOutsideAlert'
import SearchIcon from './../imgs/search.svg'
import './Search.css'

function Search( { setDeliveries } ) {
    const [ input, setInput ] = useState('')
    const [ isUserSearching, setIsUserSearching ] = useState(false)
    const divRef = useRef(null) 
    const inputRef = useRef(null)

    useEffect(() => {
        // TODO: change table
    }, [input])

    useEffect(() => {
        if (isUserSearching == true)
            inputRef.current.focus()
    }, [isUserSearching])

    useClickOutsideAlert(divRef, () => setIsUserSearching(false))

    function handleChange(event) {
        setInput(event.target.value)
    }

    const searchIconStyle = {
        display: isUserSearching ? 'none' : 'inline-block',

    }

    const inputStyle = {
        display: isUserSearching ? 'inline-block' : 'none'
    }

    return (
        <div className='search-input'
            ref={divRef}
            onClick={() => setIsUserSearching(true)}>
                
            <img src={SearchIcon} 
                alt='Search icon' 
                style={searchIconStyle}
                />

            <input type='text' 
                value={input} 
                onChange={handleChange}
                ref={inputRef}
                style={inputStyle}
                />
        </div>
    )
}

export default Search