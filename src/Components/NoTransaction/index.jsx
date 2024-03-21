import React from 'react'
import noTransaction from '../../assets/noTransaction.svg'

function NoTransaction() {
  return (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            backgroundColor: '#fff',
            fontSize: '2rem',
            marginBottom: '2rem',
        }}
    >
        <img src={noTransaction} alt="no transaction" style={{width: '400px'}} />
        <p>No Transaction Yet</p>
    </div>
  )
}

export default NoTransaction