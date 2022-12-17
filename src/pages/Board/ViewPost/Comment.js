import React, { useState, useContext, useEffect } from 'react'
import { DeleteAxios, PostAxios } from '../../../axios/serverAxios'
import { useLocation } from 'react-router-dom';
import HeartIcon from '../../../resource/heart.png';
import { useCookies } from 'react-cookie';

import './Comment.css';
import Modal from '../../../components/Modal';
import LoginModal from '../../../components/Modal/LoginModal';
import { UserInfoContext } from '../../../context/context';

const Comment = ({ comment, setComment }) => {

  const location = useLocation();
  const [cookies, setCookie] = useCookies();
  const [contextUserInfo, setContextUserInfo] = useContext(UserInfoContext)

  const [content, setContent] = useState("");
  const [modal, setModal] = useState(false);

  const postId = location.pathname.split("/")[3];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cookies["login"] === undefined) {
      setModal(true);
      return;
    }
    if (content.length == 0) {
      alert("내용을 입력하세요");
      return;
    }

    const url = `/api/comments/${postId}`;
    const data = {
      comment: content
    };

    try {
      const res = await PostAxios({ url: url, data: data });
      setComment(prev => [...prev, res]);
    }
    catch (error) {
      if (error === "unAuthorized") {
        setModal(true);
      }
    }

    setContent("");
  }

  const handleCommentLikeClick = async (id) => {
    const url = `/api/comments/like/${id}`;

    try {
      await PostAxios({ url: url });
      setComment(prev => prev.map((c) => {
        if (c.id === id) {
          c.like++;
        }
        return c;
      }));
    }
    catch (error) {
      if (error === 401) {
        setModal(true);
      }
      else if (error == 423) {
        alert("중복 멤버");
      }
    }
  }

  const handleDeleteClick = async (id) => {
    const url = `/api/comments/${id}`;

    try {
      await DeleteAxios({ url: url });
      let updateComment = comment.filter(c => c.id !== id);
      setComment(updateComment);
    }
    catch (error) {
      alert("삭제 에러");
    }

  }

  return (
    <div>
      {modal &&
        <Modal setModal={setModal}>
          <LoginModal />
        </Modal>
      }
      <div style={{ borderTop: '1px solid black' }}>
        {comment && comment.map((data) => {
          return (
            <div style={{ borderBottom: '1px solid black', padding: '7px' }} key={data.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{data.username}</span>
                <div>
                  <span style={{ fontSize: '0.9rem' }}>{data.date}</span>
                </div>
              </div>
              <div style={{margin: '15px 0px 0px 5px', fontSize: '1.2rem'}}>
                {data.content}
              </div>
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <button style={{ border: 'none', background: 'none', alignContent: 'right', cursor: 'pointer' }} onClick={() => handleCommentLikeClick(data.id)}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={HeartIcon} style={{ objectFit: 'conver' }} width='15' />
                  </div>
                </button>
                <span>{data.like}</span>
              </div>
              {
                data.username === contextUserInfo.username &&
                <button onClick={() => handleDeleteClick(data.id)}>
                  <span>삭제</span>
                </button>
              }
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '50px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ fontWeight: 'bold' }}>댓글 쓰기</div>
          <div>
            <textarea style={{ resize: 'none' }} rows='8' cols='100' value={content} onChange={(e) => { setContent(e.target.value) }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
            <button style={{ padding: '5px 20px' }} type='submit' onSubmit={handleSubmit}>작성</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Comment