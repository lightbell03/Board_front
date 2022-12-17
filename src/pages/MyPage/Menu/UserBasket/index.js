import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { GetAxios } from '../../../../axios/serverAxios'
import basket from '../../../../resource/mypage_basket.png';

const UserBasket = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = '/api/member/basket';

      const res = await GetAxios({ url: url });
      setItems(res);
      console.log(res);
    }

    fetchData();
  }, [])

  return (
    <>
      {
        items.length == 0 ?
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', top: '150px', opacity: '0.4' }}>
            <div>
              <img width='200' src={basket} />
              <div style={{textAlign: 'center', fontSize: '2rem', marginTop: '5px'}}>
                <span>원하는게 없어요...</span>
              </div>
            </div>
          </div>
          :
          <div className='market-content__container'>
            {items.map((data) => {
              return (
                <div style={{ width: '100%' }}>
                  <div key={data.id} className='market-content__box'>
                    <Link to={`/board/markets/${data.id}`}>
                      <div style={{ height: '60%', margin: '5px', border: '1px solid black' }}>
                        <img width='100%' height='100%' className='market-content__img' src={data.firstImageUrl} />
                      </div>
                      <div className='market-content__content'>
                        <div style={{ fontSize: '1.5rem' }}>
                          {data.title}
                        </div>
                        <div>
                          {data.price}
                        </div>
                        <div style={{ paddingTop: '30px', display: 'flex', justifyContent: 'flex-end', paddingRight: '20px', fontSize: '0.8rem' }}>
                          <div>
                            찜{data.like}
                          </div>
                          <div>
                            조회수{data.view}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <button>삭제</button>
                  </div>
                </div>
              )
            })}
          </div>
      }
    </>
  )
}

export default UserBasket