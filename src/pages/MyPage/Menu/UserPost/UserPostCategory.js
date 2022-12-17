import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import MarketCategory from './MarketCategory';
import BoardCategory from './BoardCategory';

const UserPostCategory = () => {

  const [marketCategoryClickCheck, setMarketCategoryClickCheck] = useState(false);
  const [boardCategoryClickCheck, setBoardCategoryClickCheck] = useState(false);

  return (
    <ul style={{ marginTop: '5px', marginBottom: '5px', listStyle: 'none' }}>
      <li style={{ margin: '5px -30px' }}>
        <Link to='userpost/market?category=all' onClick={() => setMarketCategoryClickCheck((prev) => !prev)}>
          market
        </Link>
        {marketCategoryClickCheck && <MarketCategory /> }
      </li>
      <li style={{ margin: '5px -30px' }}>
        <a onClick={() => setBoardCategoryClickCheck((prev) => !prev)}>
          board
        </a>
        {boardCategoryClickCheck && <BoardCategory />}
      </li>
    </ul>
  )
}

export default UserPostCategory;