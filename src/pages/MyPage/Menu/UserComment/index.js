import React from 'react'
import { Route, Routes } from 'react-router-dom';

import UserCommentTable from './UserCommnetTable';

const UserComment = () => {
  return (
    <Routes>
      <Route index element={<UserCommentTable />} />
    </Routes>
  )
}

export default UserComment;