import React from 'react'
import { Link } from 'react-router-dom'
import NavAdd from './NavAdd'

const NavBoard = ({ boardRef, isBoardMouseOver, setIsBoardMouseOver, boardCategory }) => {
    const boardType = "board";
    return (
        <div ref={boardRef} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Link to='/board/frees'>
                <span style={{ fontFamily: "'Times New Roman'", fontSize: '1.5rem' }}>게시판</span>
            </Link>
            <div>
                {
                    isBoardMouseOver &&
                    <NavAdd
                        isMouseOver={isBoardMouseOver}
                        setIsMosueOver={setIsBoardMouseOver}
                        categoryList={boardCategory}
                        boardType={boardType} />
                }
            </div>
        </div>
    )
}

export default NavBoard