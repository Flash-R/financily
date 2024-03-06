import React from 'react'
import "./Style.css"
function Button({text, onclick, blue, disabled}) {
  return (
    
    <div className={blue ? 'btn btn-blue': 'btn'} onClick={onclick} disabled={disabled ? "disabled": ""}>{text}</div>
  )
}

export default Button