import React from 'react'

const MessageBox = ({children}) => {
  return (
    <div style={{ position: 'fixed', overflowX: 'hidden', overflowY: 'auto', bottom: '5%', right: '5%', border: '1px solid black', width: '500px', height: '470px', background: 'white', border: 'none', borderRadius: '20px', boxShadow: '0 0 50px gray' }}>
          <div style={{ padding: '20px' }}>
            {children}
          </div>
        </div>
  )
}

export default MessageBox