import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';

import './NavAdd.css';

const NavAdd = ({ isMouseOver, setIsMosueOver, categoryList, boardType }) => {

    const boardMenuRef = useRef();

    useEffect(() => {
        window.addEventListener("mouseover", (e) => handleMouseOverEvent(e));

        return () => {
            window.removeEventListener("mouseover", (e) => handleMouseOverEvent(e));
        }
    }, [isMouseOver]);

    const handleMouseOverEvent = (e) => {
        if (boardMenuRef.current?.contains(e.target)) {
            setIsMosueOver(true);
        }
        else {
            setIsMosueOver(false);
        }
    }

    return (
        <div ref={boardMenuRef} className='nav-slide-down'>
            <div style={{ width: '70%', display: 'flex', justifyContent: 'center', border: '1px solid black' }}>
                <div>
                    <div style={{textAlign: 'center'}}>
                        <span style={{ fontSize: '2rem' }}>게시판 목록</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {
                            categoryList.map((data, index) => {
                                return (
                                    <Link key={index} style={{fontSize: '1.2rem'}} to={boardType == "market" ? `/board/markets?category=${data[0]}` : `/board/${data[0]}`}>
                                        {data[1]["kr"]}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavAdd