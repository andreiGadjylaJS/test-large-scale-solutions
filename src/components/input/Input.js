import React from 'react'
import './Input.css'

const Input = ({ onChange, inputValue }) => {
    return <input type="text" className='input' value={inputValue} onChange={e => onChange(e.target.value)} />
}

export default Input