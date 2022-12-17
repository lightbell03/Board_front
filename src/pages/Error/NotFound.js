import React from 'react'
import { Link } from 'react-router-dom';
import NotFoundImage from '../../resource/404.png';

const NotFound = () => {
  return (
    <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{display: 'block'}}>
        <img src={NotFoundImage} width='300' />
        <div style={{textAlign: 'center'}}>
          <Link to="/">
            <button style={{cursor: 'pointer', border: 'none', backgroundColor: 'rgb(192, 255, 138)', borderRadius: '5px', padding: '20px 70px'}}>
              <span style={{fontSize: '1.2rem', color: 'blue'}}>홈으로 돌아가기</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound;