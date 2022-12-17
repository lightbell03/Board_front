import React from 'react'
import { Link } from 'react-router-dom'

const BoardCategory = () => {
  return (
    <ul style={{ marginTop: '5px', marginBottom: '5px', listStyle: 'none' }}>
      <li style={{ margin: '5px -30px' }}>
        <Link to={`userpost/board?category=free`}>
          free
        </Link>
      </li>
      <li style={{ margin: '5px -30px' }}>
        <Link to={`userpost/board?category=music`}>
          music
        </Link>
      </li>
    </ul>
  )
}

export default BoardCategory