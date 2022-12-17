import React, { useState, useEffect, useContext } from 'react'
import { GetAxios, PutAxios } from '../../axios/serverAxios';
import { UserInfoContext } from '../../context/context';

import './Message.css';

const Message = ({ socketConnect, webSocketRef, roomId, chatRoomMessageInfo, setChatRoomMessageInfo }) => {

    const [contextUserInfo, setContextUserInfo] = useContext(UserInfoContext);

    const [messageInput, setMessageInput] = useState("");
    const [chatMessage, setChatMessage] = useState([]);

    useEffect(() => {
        const url = `/api/chat/messages/${roomId}`;

        const fetchData = async () => {
            let res;
            const roomInfo = chatRoomMessageInfo.filter((data) => data.roomId == roomId)[0];

            if (roomInfo.count == 0) {
                res = await GetAxios({ url: url });
            }
            else {
                res = await PutAxios({ url: url });
            }

            let messages = [];
            res.map((data) => {
                messages.push(data);
            })

            setChatMessage(messages);

            if (res.length > 0)
                setChatRoomMessageInfo(prev => prev.map((data) => {
                    if (data.roomId === res[0].roomId) {
                        data.count = 0;
                    }
                    return data;
                }));
        }
        fetchData();
    }, []);

    useEffect(() => {
        webSocketRef.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setChatMessage(prev => [...prev, data]);
        }
    }, []);


    const handleSendClick = () => {
        const userId = contextUserInfo.username;

        if (socketConnect) {
            webSocketRef.current.send(JSON.stringify({
                roomId: roomId,
                message: messageInput,
                senderId: userId
            }));
            setMessageInput("");
        }
    }

    return (
        <div className='slide-right'>
            <div style={{ height: '370px', border: '1px solid black', overflowY: 'scroll', overflowX: 'hidden' }}>
                {
                    chatMessage && chatMessage.map((data, index) => {
                        return (
                            <div key={index}>
                                <div className={contextUserInfo.username != data.senderId ? 'message-receiver__info' : 'message-sender__info'}>
                                    <span>{data.senderId}</span>
                                    </div>
                                <div className={contextUserInfo.username != data.senderId ? 'message-receiver' : 'message-sender'}>
                                    {data.message}
                                </div>
                                <div className={contextUserInfo.username != data.senderId ? 'message-receiver__info-date' : 'message-sender__info-date'}>
                                    <span>{data.date}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div style={{ display: 'flex', height: '20%' }}>
                <input type='text' value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                <button type='button' onClick={handleSendClick}>send</button>
            </div>

        </div>
    )
}

export default Message