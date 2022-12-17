import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom';
import UserMarketPost from './UserMarketPost';
import UserBoardPost from './UserBoardPost';

const UserPost = () => {

  const Layout = () => {
    return (
      <div>
        <Outlet />
      </div>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route path='/market/*' element={<UserMarketPost />} />
        <Route path='/board/*' element={<UserBoardPost />} />
      </Route>
    </Routes>
  )
}

export default UserPost;