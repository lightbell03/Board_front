import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { PostAxios, serverAxios } from '../../axios/serverAxios';
import styles from './Register.module.css';

const Register = () => {

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "/sign-up";
    const data = {
      userId: userId,
      userPwd: userPwd,
      age: userAge,
      email: userEmail,
      name: userName
    }
    const res = await PostAxios({url: url, data: data});
    navigate("/", {replace: true});
  }

  return (
    <div className={styles.register_container}>
      <div>
        <div className={styles.register_title}>
          <h1>Register Now!!!</h1>
        </div>
        <div>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <div>
              <div>이름</div>
              <input className={styles.user_input} id='userName' type='input' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='이름을 입력하세요' />
            </div>
            <div>
              <div>나이</div>
              <input className={styles.user_input} id='userAge' type='input' value={userAge} onChange={(e) => setUserAge(e.target.value)} placeholder='나이를 입력하세요' />
            </div>
            <div>
              <div>아이디</div>
              <input className={styles.user_input} id='userId' type='input' value={userId} onChange={(e) => setUserId(e.target.value)} placeholder='등록할 아이디를 입력하세요' />
            </div>
            <div>
              <div>비밀번호</div>
              <input className={styles.user_input} id='userPwd' type={showPwd ? "text" : "password"} value={userPwd} onChange={(e) => setUserPwd(e.target.value)} placeholder='비밀번호를 입력하세요' />
            </div>
            <div>
              <div>이메일</div>
              <input className={styles.user_input} id='userEmail' type='input' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder='이메일을 입력하세요' />
            </div>
            <button className={styles.submit_button} type='submit' onClick={handleSubmit}>회원가입</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register