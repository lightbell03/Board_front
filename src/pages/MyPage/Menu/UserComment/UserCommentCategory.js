import React from 'react'
import { Link } from 'react-router-dom'

const UserCommentCategory = () => {
    return (
        <ul style={{ marginTop: '5px', marginBottom: '5px', listStyle: 'none' }}>
            <li style={{ margin: '5px -30px' }}>
                <Link to='/mypage/usercomment?category=free'>
                    free
                </Link>
            </li>
            <li style={{ margin: '5px -30px' }}>
                <Link to='/mypage/usercomment?category=music'>
                    music
                </Link>
            </li>
        </ul>
    )
}

export default UserCommentCategory