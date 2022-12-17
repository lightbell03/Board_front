import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserInfoContext } from '../../context/context';
import styles from './Login.module.css';

import { PostAxios } from '../../axios/serverAxios';

const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [loginFail, setLoginFail] = useState(false);
  const [contextUserInfo, setContextUserInfo] = useContext(UserInfoContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = '/api/login';
    const data = {
      username: userId,
      password: userPwd
    };

    try {
      const res = await PostAxios({ url: url, data: data });
      setContextUserInfo(res);
      setIsLogin(true);
      navigate("/");
    } catch (error) {
      if (error == 400) {
        setLoginFail(true);
      }
    }

  }

  return (
    <div className={styles.login_container}>
      <div className={styles.content_container}>
        <div>
          <div className={styles.signin_title}>
            <h1>Sign In!</h1>
          </div>
          <div>
            {
              loginFail &&
              <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'rgb(230, 250, 217)', border: '1px solid red', padding: '10px', borderRadius: '10px', marginBottom: '10px'}}>
                <span style={{ color: 'red' }}>Invalid Username or Password</span>
              </div>
            }
            <form className={styles.user_form} onSubmit={handleSubmit} method='post'>
              <div style={{ marginLeft: '10px' }}>
                아이디
              </div>
              <input id='userId' className={styles.user_input} type='text' value={userId}
                onChange={(e) => setUserId(e.target.value)} placeholder='아이디를 입력하세요' />
              <div style={{ marginLeft: '10px' }}>
                비밀번호
              </div>
              <input id='userPwd' className={styles.user_input} type='password' value={userPwd}
                onChange={(e) => setUserPwd(e.target.value)} placeholder='비밀번호를 입력하세요' />
              <button className={styles.submit_btn} type='submit' onClick={handleSubmit}>Sign In!!</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login