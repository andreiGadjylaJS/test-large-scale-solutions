import React from 'react'
import './Checkbox.css'

const Checkbox = ({ onChangeCheckbox, title }) => {
    return (
        <label className="wrapper--checkbox" >
            <input type="checkbox" className="filter__checkbox" onClick={e => onChangeCheckbox(e.target.checked)} /> <spam className="title">{title}</spam>
        </label>
    )
}

export default Checkbox