import { useEffect, useState } from 'react';
import './App.css';
import { Outlet, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import NotFound from './pages/Error/NotFound';
import { ChatOpenContext, UserInfoContext, UserProfileImageContext } from './context/context';
import Market from './pages/Market';
import Messanger from './components/Messanger';
import ErrorPage from './pages/Error/ErrorPage';
import { GetAxios } from './axios/serverAxios';
import {useCookies} from 'react-cookie';
import Music from './pages/Board/Music';
import Free from './pages/Board/Free';


function App() {
  
  const [cookies, setCookie] = useCookies();
  
  const [isLogin, setIsLogin] = useState(false);
  const [contextUserInfo, setContextUserInfo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetAxios({url: '/api/member'});
      setContextUserInfo(res);
    }
    
    if(cookies.login)
      fetchData();
  }, [])

  const Layout = () => {

    const [messengerOpen, setMessengerOpen] = useState(false);

    return (
      <div>
        <Nav isLogin={isLogin} setIsLogin={setIsLogin} />
        <ChatOpenContext.Provider value={[messengerOpen, setMessengerOpen]}>
          <div style={{ position: 'relative', zIndex: '1' }}>
            <Messanger />
          </div>
          <Outlet />

        </ChatOpenContext.Provider>
      </div>
    )
  }

  return (
      <UserInfoContext.Provider value={[contextUserInfo, setContextUserInfo]}>
          <div>
            <Routes>
              <Route path='/' element={<Layout />} >
                <Route index element={<Main />} />
                <Route path='/board/frees/*' element={<Free />} />
                <Route path='/board/musics/*' element={<Music />} />
                <Route path='/board/markets/*' element={<Market />} />
                <Route path='/mypage/*' element={<MyPage />} />
              </Route>

              <Route path='/login' element={<Login setIsLogin={setIsLogin} />} />
              <Route path='/register' element={<Register />} />

              <Route path='/bad' element={<ErrorPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
      </UserInfoContext.Provider>
  );
}

export default App;
