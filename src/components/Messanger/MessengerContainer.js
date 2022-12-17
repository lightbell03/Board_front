import React, { useState, useEffect, useContext } from 'react'
import { serverAxios } from '../../axios/serverAxios';
import messangerImage from '../../resource/messenger.png';
import { ChatOpenContext } from '../../context/context';
import './MessengerContainer.css';

const MessengerContainer = ({ children, setMessenger, chatRoomMessageInfo, setChatRoomMessageInfo }) => {

    const [newMessageCount, setNewMessageCount] = useState("");

    useEffect(() => {
        let totalCount = 0;
        chatRoomMessageInfo.map((data) => {
            totalCount += data.count;
        })
        setNewMessageCount(totalCount);

    }, [chatRoomMessageInfo]);

    const handleClick = () => {
        setMessenger(true);
    }

    return (
        <div className='mc-container'>
            {
                newMessageCount != 0 &&
                    <div className='mc-newmessage-count'>
                        {newMessageCount}
                    </div>
            }
            <button className='mc-btn' onClick={() => handleClick()}>
                <img width='100%' src={messangerImage} style={{ objectFit: 'cover' }} />
            </button>
            {children}
        </div>
    )
}

export default MessengerContainer