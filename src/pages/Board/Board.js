import React, { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom';
import { GetAxios } from '../../axios/serverAxios';
import Modal from '../../components/Modal';
import LoginModal from '../../components/Modal/LoginModal';
import BoardTable from './BoardTable';
import BoardSearch from './BoardSearch';
import BoardWrite from './BoardWrite';

import './Board.css';
import { FreeColumnWidth, FreeHeadersName, MusicColumnWidth, MusicHeadersName } from '../../utils/utils';

const Board = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [modal, setModal] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [headersName, setHeadersName] = useState([]);
  const [columnWidth, setColumnWidth] = useState([]);
  
  const type = location.pathname.split("/")[2];

  useEffect(() => {
    if(type === "frees") {
      setHeadersName(FreeHeadersName);
      setColumnWidth(FreeColumnWidth);
    }
    else if(type === "musics") {
      setHeadersName(MusicHeadersName);
      setColumnWidth(MusicColumnWidth);
    }

    let page = searchParams.get("page");
    if (page === null) {
      page = 0;
    } else {
      page -= 1;
    }

    const param = {
      search: searchParams.get("search_keyword"),
      page: page
    }

    fetchData(param);

  }, [searchParams]);

  const fetchData = async (param) => {
    const url = `/api/board/${type}`;
    const data = await GetAxios({ url: url, param: param })
    console.log(data);
    setPageInfo(data.page);
    setBoardList(data._embedded?.board);
  }

  return (
    <div className='free-container'>
      <div className='free-content'>
        <div style={{ textAlign: 'center' }}>
          <BoardWrite setModal={setModal}/>
          <BoardTable
            headersName={headersName}
            columnWidth={columnWidth}
            boardList={boardList}
            pageInfo={pageInfo} />
        </div>
        <BoardSearch fetchData={fetchData}/>
      </div>
      {modal &&
        <Modal setModal={setModal}>
          <LoginModal />
        </Modal>}
    </div>
  )
}

export default Board