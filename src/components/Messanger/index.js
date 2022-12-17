import React, { useState, useEffect, useRef, useContext } from 'react'
import { useCookies } from 'react-cookie';

import { ChatOpenContext, UserInfoContext } from '../../context/context';
import './Messanger.css';
import MessengerContainer from './MessengerContainer';
import MessageBox from './MessageBox';
import MessageBoxTop from './MessageBoxTop';
import Message from './Message';
import MessageList from './MessageList';
import { GetAxios } from '../../axios/serverAxios';

const Messanger = () => {

  const [messenger, setMessenger] = useContext(ChatOpenContext);
  const [contextUserInfo, setContextUserInfo] = useContext(UserInfoContext);

  const [messageClick, setMessageClick] = useState(false);
  const [socketConnect, setSocketConnect] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [chatRoomMessageInfo, setChatRoomMessageInfo] = useState([]);

  const webSocketRef = useRef(null);

  useEffect(() => {
    if (contextUserInfo) {
      const fetchData = async () => {
        const url = '/api/chat/messages';
        const data = await GetAxios({ url: url });

        let totalCount = 0;
        data.map((data) => {
          totalCount += data.count;
        })
        setChatRoomMessageInfo(data);
      }

      fetchData();

      const eventSource = new EventSource('http://localhost:8080/notify', {
        withCredentials: true
      });

      eventSource.onmessage = (notify) => {
        console.log(notify.data);
        if (notify.data === "test") {
          return;
        }

        let message = JSON.parse(notify.data);
        let roomCheck = chatRoomMessageInfo.filter((data) => data.roomId == message.roomId);
        
        if(roomCheck.length == 0){
          setChatRoomMessageInfo(prev => [prev, {
            roomId: message.roomId,
            roomName: message.roomName,
            count: 1,
            message: message.message
          }])
        }

        setChatRoomMessageInfo(prev =>
          prev.map((data) => {
            if (message.roomId === data.roomId) {
              data.count++;
            }
            return data;
          })
        );
      }
    }
  }, [contextUserInfo]);

  if (contextUserInfo) {
    return (
      <MessengerContainer setMessenger={setMessenger} chatRoomMessageInfo={chatRoomMessageInfo} setChatRoomMessageInfo={setChatRoomMessageInfo}>
        {
          messenger &&
          <MessageBox>
            {/* 채팅 상단 바 */}
            <MessageBoxTop messageClick={messageClick} setMessenger={setMessenger} setMessageClick={setMessageClick} setSocketConnect={setSocketConnect} webSocketRef={webSocketRef} />
            {/* 메세지 */}
            {
              messageClick ?
                <Message
                  messageClick={messageClick}
                  socketConnect={socketConnect}
                  webSocketRef={webSocketRef}
                  roomId={roomId}
                  chatRoomMessageInfo={chatRoomMessageInfo}
                  setChatRoomMessageInfo={setChatRoomMessageInfo} />
                :
                <MessageList
                  socketConnect={socketConnect}
                  webSocketRef={webSocketRef}
                  setMessageClick={setMessageClick}
                  setSocketConnect={setSocketConnect}
                  setRoomId={setRoomId}
                  chatRoomMessageInfo={chatRoomMessageInfo}
                  setChatRoomMessageInfo={setChatRoomMessageInfo} />
            }
          </MessageBox>
        }
      </MessengerContainer>
    )
  }
  else
    return (
      <></>
    )
}

export default Messanger;
