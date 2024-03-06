import React from 'react'
import "./style.css"

function Input({ label, state, setState, type, placeholder }) {
    return (
        <div className='input-wrapper'>
            <p className='label'>{label}</p>
            <input 
            value={state} 
            onChange={(e) => setState(e.target.value)} 
            className='input' type={type} 
            placeholder={placeholder} />
        </div>
    )
}

export default Input