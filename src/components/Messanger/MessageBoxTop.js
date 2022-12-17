import React from 'react'

const MessageBoxTop = ({ messageClick, setMessenger, setMessageClick, setSocketConnect, webSocketRef }) => {
  const handleCloseMessenger = () => {
    setMessenger(false);
    setMessageClick(false);
    setSocketConnect(false);
  }

  const handleClick = () => {
    setMessageClick(false);
    setSocketConnect(false);
    webSocketRef.current.close();
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      {
        !messageClick ?
          <>
            <div>
              <span>메세지</span>
            </div>
            <div style={{ fontSize: '20px', cursor: 'pointer' }} onClick={handleCloseMessenger}>
              X
            </div>
          </>
          :
          <>
            <button type='button' onClick={handleClick}> &lt; </button>
            <div style={{ fontSize: '20px', cursor: 'pointer' }} onClick={handleCloseMessenger}>
              X
            </div>
          </>
    }
    </div>
  )
}

export default MessageBoxTop