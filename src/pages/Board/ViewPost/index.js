import React, { useEffect, useState, useContext } from 'react'
import { GetAxios } from '../../../axios/serverAxios';
import { useLocation } from 'react-router-dom';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import Comment from './Comment';

import './ViewPost.css';
import Modal from '../../../components/Modal';
import LoginModal from '../../../components/Modal/LoginModal';
import Content from './Content';
import Title from './Title';

const ViewPost = () => {

  const location = useLocation();

  const [item, setItem] = useState({});
  const [comment, setComment] = useState();
  const [modal, setModal] = useState(false);

  const boardType = location.pathname.split("/")[2];
  const postId = location.pathname.split("/")[3];

  useEffect(() => {

    const fetchDate = async () => {
      const url = `/api/board/${boardType}/${postId}`;

      const data = await GetAxios({ url: url });
      console.log(data);
      setItem(data);
      setComment(data.comments);
    }

    fetchDate();
  }, []);

  return (
    <>
      {modal &&
        <Modal setModal={setModal}>
          <LoginModal />
        </Modal>
      }
      <div style={{ width: '80%', margin: 'auto' }}>
        <Title
          item={item}
          postId={postId} />
        <Content
          item={item}
          setItem={setItem}
          postId={postId}
          setModal={setModal} />
        {
          comment &&
          <Comment
            comment={comment}
            setComment={setComment} />
        }
      </div>
    </>
  )
}

export default ViewPost