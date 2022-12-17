import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Board from '../Board';
import ViewPost from '../ViewPost';
import WritePost from '../WritePost';

import EditPost from '../EditPost';

const Free = () => {
  return (
    <Routes>
      <Route path='/' element={<Board />} />
      <Route path='/:id' element={<ViewPost />} />
      <Route path='/edit/:id' element={<EditPost />} />
      <Route path='/post' element={<WritePost />} />
    </Routes>
  )
}

export default Free