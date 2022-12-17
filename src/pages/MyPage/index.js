import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import Profile from './Menu/Profile';
import UserComment from './Menu/UserComment';
import UserPost from './Menu/UserPost';
import UserBasket from './Menu/UserBasket';
import Menu from './Menu';
import DashBoard from './Menu/DashBoard';
import Title from './Title';

const MyPage = () => {

    const Layout = () => {
        return (
            <>
                <Nav />
                <Title />
                <Outlet />
            </>
        )
    }

    return (
        <div style={{ marginTop: '120px', height: '100vh', display: 'flex' }}>
            {/* side menu */}
            <Menu />
            {/* content */}
            <div style={{ width: '70%' }}>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<DashBoard />} />
                        <Route path='/userprofile/*' element={<Profile />} />
                        <Route path='/userpost/*' element={<UserPost />} />
                        <Route path='/usercomment/*' element={<UserComment />} />
                        <Route path='/basket/*' element={<UserBasket />} />
                    </Route>
                </Routes>
            </div>
        </div>
    )
}

export default MyPage;