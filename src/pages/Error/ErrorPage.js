import React from 'react'
import { Link } from 'react-router-dom';
import Warning from '../../resource/warning.png';

const ErrorPage = () => {
  return (
    <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <div style={{fontSize: '2rem', color: 'rgb(250, 85, 70)', textAlign: 'center'}}>
        <span>Bad Request</span>
        </div>
        <img src={Warning} width='400' />
        <div style={{marginTop: '10px', textAlign: 'center'}}>
          <Link to="/">
            <span style={{padding: '20px 50px', background: 'rgb(220, 250, 195)', borderRadius: '10px'}}>홈으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage