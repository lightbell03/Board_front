import React, { useRef, useState, useContext } from 'react'
import { PostAxios, serverAxios } from '../../../axios/serverAxios';
import { UserInfoContext } from '../../../context/context';
import './LoginModal.css';

const LoginModal = () => {

    const [contextUserInfo, setContextUserInfo] = useContext(UserInfoContext);

    const [userId, setUserId] = useState("");
    const [userPwd, setUserPwd] = useState("");

    const handleChange = (e) => {
        if (e.target.name == 'id')
            setUserId(e.target.value);
        else if (e.target.name == 'password')
            setUserPwd(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/login';
        const data = {
            username: userId,
            password: userPwd
        }

        const res = await PostAxios({ url: url, data: data });
        setContextUserInfo(res);
    }

    return (
        <div className='loginmodal_content'>
            <div>
                <div className='loginmodal_modal__toptext'>
                    로그인이 필요합니다.
                </div>
                <form className='loginmodal_form' onSubmit={handleSubmit} >
                    <div className='loginmodal_input'>
                        <span className='loginmodal_text_span'>아이디</span>
                        <input style={{padding: "5px 10px"}} name='id' type='input'
                            value={userId} placeholder='아이디를 입력하세요'
                            onChange={handleChange} />
                    </div>
                    <div className='loginmodal_input' >
                        <span className='loginmodal_text_span'>비밀번호</span>
                        <input style={{padding: "5px 10px"}} name='password' type='password'
                            value={userPwd} placeholder='비밀번호'
                            onChange={handleChange} />
                    </div>
                    <button className='loginmodal_btn' type='submit' onSubmit={handleSubmit}>로그인</button>
                </form>
            </div>
        </div>
    )
}

export default LoginModal;