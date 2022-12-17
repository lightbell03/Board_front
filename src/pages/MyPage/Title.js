import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';

import './Title.css';

const Title = () => {
  const titleList = {
    dashboard: '대시보드',
    userprofile: '프로필',
    userpost: '작성 글',
    usercomment: '댓글',
    basket: '장바구니'
  };

  const location = useLocation();

  const [title, setTitle] = useState();

  useEffect(() => {
    let curPath = location.pathname.split('/')[2];
    let curTitle = curPath == undefined ? 'dashboard' : curPath;

    setTitle(curTitle);
  }, [location.pathname])
  
  return (
    <div className='mypage-title__container'>
        <div className='mypage-title__text'>
          <span>{titleList[`${title}`]}</span>
        </div>
    </div>
  )
}

export default Title