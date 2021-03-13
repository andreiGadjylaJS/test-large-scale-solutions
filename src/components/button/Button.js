import React from 'react'
import './Button.css'

const Button = ({ onChange, title }) => {
    return (
        <button className='button' onClick={onChange} >{title}</button>
    )
}

export default Button