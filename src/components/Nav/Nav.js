import React, { useContext, useEffect, useRef, useState } from 'react'
import './Nav.css';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { UserInfoContext } from '../../context/context';
import NavMarket from './NavMarket';
import { LoginLayout, NotLoginLayout } from './NavAuth';
import NavBoard from './NavBoard';

const Nav = () => {

  const marketCategory = [
    ["all", {
      "kr": "전체",
    }],
    ["electric", {
      "kr": "전자기기"
    }],
    ["manCloth", {
      "kr": "남성의류",
    }],
    ["womanCloth", {
      "kr": "여성의류",
    }],
    ["stuff", {
      "kr": "잡화",
    }],
    ["furniture", {
      "kr": "가구",
    }],
  ];
  const boardCategory = [
    ["frees", {
      "kr": '자유게시판'
    }],
    ["musics", {
      "kr": '음악게시판'
    }]
  ];

  const [cookies, setCookie] = useCookies();
  const boardRef = useRef();
  const marketRef = useRef();

  const [contextUserInfo, setContextUserInfo] = useContext(UserInfoContext);

  const [isBoardMouseOver, setIsBoardMouseOver] = useState(false);
  const [isMarketMouseOver, setIsMarketMouseOver] = useState(false);

  const [userProfileImage, setUserProfileImage] = useState("");

  useEffect(() => {
    window.addEventListener("mouseover", (e) => mouseOverEvent(e));
    window.addEventListener("mouseout", () => mouseLeaveEvent());

    setUserProfileImage(contextUserInfo.profileImage);

    return () => {
      window.removeEventListener("mouseover", (e) => mouseOverEvent(e));
      window.removeEventListener("mouseout", () => mouseLeaveEvent());
    }

  }, [isBoardMouseOver, isMarketMouseOver]);

  const mouseOverEvent = (e) => {
    if (boardRef.current?.contains(e.target)) {
      setIsBoardMouseOver(true);
    }
    else if (marketRef.current?.contains(e.target)) {
      setIsMarketMouseOver(true);
    }
    else {
      setIsBoardMouseOver(false);
      setIsMarketMouseOver(false);
    }
  }

  const mouseLeaveEvent = () => {
    setIsBoardMouseOver(false);
    setIsMarketMouseOver(false);
  }

  return (
    <nav className='nav-container'>
      <div className='nav'>
        <div className='menu'>
          <div className='menu-home'>
            <Link to='/' >
              home
            </Link>
          </div>
          {/* navigation */}
          <div className='menu-item'>
            <NavMarket
              marketRef={marketRef}
              isMarketMouseOver={isMarketMouseOver}
              setIsMarketMouseOver={setIsMarketMouseOver}
              marketCategory={marketCategory} />
            <NavBoard
              boardRef={boardRef}
              isBoardMouseOver={isBoardMouseOver}
              setIsBoardMouseOver={setIsBoardMouseOver}
              boardCategory={boardCategory} />
          </div>

          {/* 로그인 */}
          <div className='menu-login'>
            {
              cookies.login ?
                <LoginLayout userProfileImage={userProfileImage} />
                :
                <NotLoginLayout />
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav;