import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { GetAxios, PostAxios } from '../../../axios/serverAxios';
import Modal from '../../../components/Modal';
import LoginModal from '../../../components/Modal/LoginModal';
import { ChatOpenContext, UserInfoContext } from '../../../context/context';
import BasketImage from '../../../resource/basket.png';
import { useCookies } from 'react-cookie';

import './MarketView.css';

export const MarketView = () => {

  const location = useLocation();

  const [messengerOpen, setMessengerOpen] = useContext(ChatOpenContext);
  const [contextUserInfo, setContextUserInfo] = useContext(UserInfoContext);
  const [cookies, setCookie] = useCookies(["login"]);

  const [item, setItem] = useState({});
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState("");

  const marketId = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchData = async () => {
      let url = `/api/board/markets/${marketId}`;

      const data = await GetAxios({ url: url });
      console.log(data);
      setItem(data);
    }

    fetchData();
    setUsername(contextUserInfo.username);
  }, [])

  const handleBuyClick = async () => {
    if (cookies["login"] === undefined) {
      setModal(true);
      return;
    }
    const url = `/api/chat/${marketId}`;

    await PostAxios({ url: url })
      .catch((error) => {
        setModal(true);
      });

    setMessengerOpen(true);
  }

  const handleBasketClick = async () => {
    if (cookies["login"] === undefined) {
      setModal(true);
      return;
    }
    let url = `/api/like/${marketId}`;

    const data = await PostAxios({ url: url });

    if (data == "duplicate member") {
      alert("이미 장바구니에 담겨있습니다.");
    }
    else {
      let updateItem = item;
      updateItem.view++;
      setItem(updateItem);
    }

  }

  return (
    <main style={{ marginTop: '50px' }}>
      {modal &&
        <Modal setModal={setModal}>
          <LoginModal />
        </Modal>
      }
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', width: "300px", overflowX: 'scroll' }}>
            <span >&lt;</span>
            {
              item.imageUrls && item.imageUrls.map((data, index) => {
                return (
                  <img key={index} width='100%' height='100%' src={data} style={{ objectFit: 'contain' }} />
                )
              })
            }
            <div style={{ zIndex: "1000" }}>
              <span style={{ position: 'relative', top: '0', right: '40' }}>&gt;</span>
            </div>
          </div>
          <div style={{ marginLeft: '50px', width: '40%' }}>
            <div style={{ fontSize: '2rem' }}>
              <span>{item.title}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', color: 'rgb(204, 202, 202)' }}>
              <span>조회수 {item.view}</span>
              <span style={{ marginLeft: '20px' }}>찜: {item.like}</span>
            </div>
            <div style={{ textAlign: 'right', fontSize: '1.5rem', fontWeight: 'bold' }}>
              <span>{item.price}</span>
              <span style={{ marginLeft: '5px' }}>원</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>판매자</span>
              <span>{item.seller}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {
                username === item.seller ?
                  <>
                    <button type='button' style={{ width: '50%', height: '50px', marginRight: '5px', background: 'rgb(207, 209, 208)', border: 'none', borderRadius: '5px' }} disabled>구매하기</button>
                    <Link to={`/board/markets/edit/${marketId}`} style={{ textDecorationLine: 'none', width: '20%', background: 'rgb(152, 187, 245)', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <span style={{ color: 'white' }}>수정하기</span>
                    </Link>
                  </>
                  :
                  <>
                    <button type='button' style={{ width: '50%', height: '50px', marginRight: '5px', background: 'rgb(208, 255, 205)', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={handleBuyClick}>구매하기</button>
                    <button type='button' style={{ width: '20%', background: 'rgb(152, 187, 245)', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleBasketClick()}>
                      <img src={BasketImage} width='40' style={{ objectFit: 'cover' }} />
                    </button>
                  </>
              }
            </div>
          </div>
        </div>
        <div style={{marginTop: '50px', display: 'flex', justifyContent: 'center'}}>
          <div style={{color: 'black', width: '800px', height: '400px'}}>
            <textarea style={{fontSize: '1.5rem', resize: 'none', width: '100%', height: '100%', border: 'none'}} disabled color='black' placeholder={item.content}/>
          </div>
        </div>
      </div>
    </main>
  )
}