import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { GetAxios } from '../../axios/serverAxios'

export const LoginLayout = ({userProfileImage}) => {

    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const handleClick = async () => {
        const url = '/api/member/logout';
    
        try {
          await GetAxios({ url: url })
          removeCookie("login");
          navigate('/', { replace: true });
          window.location.reload();
        }
        catch (error) {
          navigate('/bad');
        }
      }

    return (
        <>
            <img src={userProfileImage} width='40' height='40' style={{ objectFit: 'cover', borderRadius: '50%' }} />

            <button type='button' style={{ border: 'none', background: 'none' }} onClick={() => handleClick()}>logout</button>
            <Link to='/mypage'>
                my page
            </Link>
        </>
    )
}

export const NotLoginLayout = () => {
    return (
        <>
            <Link to='/login'>
                login
            </Link>
            <Link to='/register'>
                register
            </Link>
        </>
    )
}