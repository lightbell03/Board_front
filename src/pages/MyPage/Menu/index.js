import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import UserPostCategory from './UserPost/UserPostCategory';

import './Menu.css';
import UserCommentCategory from './UserComment/UserCommentCategory';

const Menu = () => {
    const [userPostClickCheck, setUserPostClickCheck] = useState(false);
    const [userCommentClickCheck, setUserCommentClickCheck] = useState(false);

    return (
        <div className='side-nav__container'>
            <div className='side-nav__content'>
                <Link className='side-nav__link' to='/mypage'>
                    대시보드
                </Link>
                <Link className='side-nav__link' to='/mypage/userprofile'>
                    프로필
                </Link>
                <div className='side-nav__link_ul' onClick={() => setUserPostClickCheck((prev) => !prev)}>
                    작성 글
                </div>
                {userPostClickCheck && <UserPostCategory />}
                <div className='side-nav__link_ul' onClick={() => setUserCommentClickCheck((prev) => !prev)}>
                    댓글
                </div>
                {userCommentClickCheck && <UserCommentCategory />}
                <Link className='side-nav__link' to='/mypage/basket'>
                    장바구니
                </Link>
                <div className='side-nav__link'>
                    로그아웃
                </div>
            </div>
        </div>
    )
}

export default Menu