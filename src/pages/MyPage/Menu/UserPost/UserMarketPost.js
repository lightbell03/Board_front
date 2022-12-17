import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom';
import { GetAxios, PutAxios } from '../../../../axios/serverAxios';

import '../../../Market/MarketBoard.css';

const UserMarketPost = () => {
  const [params] = useSearchParams();

  const [items, setItems] = useState([]);

  const category = params.get("category");

  const fetchData = async () => {
    const url = '/api/member/markets';
    const param = { 
      category: category
    }

    const res = await GetAxios({url: url, param: param})
    setItems(res);
  }

  useEffect(() => {    
    fetchData();
  }, [params])

  const handleSoldClick = async (e) => {
    const marketId = e.target.id;
    const url = `/api/board/markets/${marketId}`;
    const data = {
      status: "SOLD"
    }
    await PutAxios({url: url, data: data});

    fetchData();
  }

  return (
    <div>
      <div style={{borderBottom: '1px solid lightgray', fontSize: '2rem', color: 'lightgray'}}>
      <span>판매 &gt; {params.get('category')}</span>
      </div>
    <div className='market-content__container'>
      {items && items.map((data) => {
        return (
            <div key={data.id} className='market-content__box' style={data.status == "SOLD" ? {opacity: '0.5'} : {}} >
              <Link to={`/board/markets/${data.id}`} params={{testValue: 'test'}}>
                <div style={{ height: '60%', margin: '5px', border: '1px solid black' }}>
                  <img width='100%' height='100%' className='market-content__img' src={data.firstImageUrl} />
                </div>
                <div className='market-content__content'>
                  <div>
                    {data.title}
                  </div>
                  <div>
                    {data.userId}
                  </div>
                  <div>
                    {data.price}
                  </div>
                </div>
              </Link>
              <div>
                <button id={data.id} type='button' onClick={handleSoldClick}>판매완료</button>
              </div>
            </div>
        )
      })}
    </div>
    </div>
  )
}

export default UserMarketPost;