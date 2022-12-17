import React, {useState} from 'react'
import { Routes, Route, Outlet } from 'react-router-dom';
import { MarketView } from './MarketView';
import { MarketWrite } from './MarketWrite';
import MarketEdit from './MarketEdit';
import MarketBoard from './MarketBoard';

const Market = () => {

  const [selfLink, setSelfLink] = useState("");

  const LayOut = () => {

    return (
      <>
        <Outlet />
      </>
    )
  }

  return (
    <div style={{ display: 'flex', justifyContent:'center', marginTop: '60px' }}>
      <div style={{ width: '80%' }}>
        <Routes>
          <Route path='/' element={<LayOut />} >
            <Route index element={<MarketBoard setSelfLink={setSelfLink}/>} />
            <Route path='/post' element={<MarketWrite />} />
            <Route path='/edit/:id' element={<MarketEdit />} />
            <Route path='/:id' element={<MarketView selfLink={selfLink}/>} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default Market