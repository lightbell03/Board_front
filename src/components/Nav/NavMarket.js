import React from 'react'
import { Link } from 'react-router-dom'
import NavAdd from './NavAdd'

const NavMarket = ({marketRef, isMarketMouseOver, setIsMarketMouseOver, marketCategory}) => {
    const boardType = "market";
    return (
        <>
            <div ref={marketRef} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Link to={`/board/markets?category=all`}>
                    <span style={{ fontFamily: "sans-serif", fontSize: '1.5rem' }}>마켓</span>
                </Link>
                <div>
                    {isMarketMouseOver &&
                     <NavAdd
                      isMouseOver={isMarketMouseOver} 
                      setIsMosueOver={setIsMarketMouseOver} 
                      categoryList={marketCategory}
                      boardType={boardType} />}
                </div>
            </div>
        </>
    )
}

export default NavMarket