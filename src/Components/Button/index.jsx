import React from 'react'
import "./Style.css"
function Button({text, onclick, blue}) {
  return (
    
    <div className={blue ? 'btn btn-blue': 'btn'} onClick={onclick}>{text}</div>
  )
}

export default Button