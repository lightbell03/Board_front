import React, { useContext, useEffect, useRef } from 'react'
import { UserInfoContext } from '../../context/context';

const MessageList = ({ setMessageClick, setSocketConnect, socketConnect, webSocketRef, setRoomId, chatRoomMessageInfo }) => {

  const chatRoomRef = useRef();
  const [contextUserInfo, setContextUserInfo] = useContext(UserInfoContext);

  useEffect(() => {
    
  }, [chatRoomMessageInfo])

  const handleMessageClick = () => {
    setMessageClick(true);
    setRoomId(chatRoomRef.current.id);

    if (!socketConnect) {
      webSocketRef.current = new WebSocket(`ws://localhost:8080/ws/chat/${chatRoomRef.current.id}/${contextUserInfo.id}`);

      webSocketRef.current.onopen = () => {
        console.log("connect");
        setSocketConnect(true);
      }

      webSocketRef.current.onclose = () => {
        console.log("disconnect");
      }

      webSocketRef.current.onerror = (error) => {
        console.log("error : ", error);
      }
    }
  }

  return (
    <div className='slide-left'>
      <div>
        {
          chatRoomMessageInfo.map((data) => {
            return (
              <div id={data.roomId} key={data.roomId} ref={chatRoomRef} style={{ height: '80px', border: '1px solid lightgray', borderRadius: '5px', margin: '0 0 20px 0', boxShadow: '0 0 10px lightgray', cursor: 'pointer' }} onClick={handleMessageClick}>
                {data.roomName}
                {
                  data.count != 0 ?
                    <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '5px', right: '10px', background: 'red', borderRadius: '100%', width: '30px', height: '30px', color: 'white', fontSize: '0.8rem' }}>
                      {data.count}
                    </div> :
                    <></>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MessageList