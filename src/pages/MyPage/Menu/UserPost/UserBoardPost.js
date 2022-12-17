import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom';
import {GetAxios} from '../../../../axios/serverAxios';
import LinkTd from '../../../../components/LinkTd';

const UserBoardPost = () => {

  const headersName = ["no", "제목", "작성자", "댓글수", "조회수", "추천", "등록일"];
  const columnWidth = ['10%', '40%', '10%', '10%', '10%', '10%', '10%'];

  const [params, setParams] = useSearchParams();
  
  const [items, setItems] = useState([]);

  const category = params.get("category");

  useEffect(() => {

    const fetchData = async() => {
      const url = '/api/member/board/frees';
      const param = {
        category: category
      };

      const res = await GetAxios({url: url, param: param});
      setItems(res);
    }

    fetchData();
  }, [category]);

  
  return (
    <div style={{ width: '100%', borderTop: "1px solid black" }}>
        <table style={{ width: '100%', margin: 'auto', borderSpacing: '0', borderCollapse: 'collapse'}}>
          <thead>
            <tr>
              {headersName.map((item, index) => {
                return (
                  <th style={{ padding: '10px 5px', borderBottom: '1px solid black', textAlign: 'center', width: columnWidth[index] }} key={index}>{item}</th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {items.map((data, index) => {
              let loc = `/board/frees/${data.id}`;
              const s1 = { textDecoration: 'none', color: 'black', padding: '10px 0px', display: 'block', width: '100%', height: '10px', borderBottom: '1px solid lightgray'};
              const s2 = { textDecoration: 'none', color: 'black', padding: '10px 0px', display: 'block', width: '100%', height: '10px', textAlign: 'left', borderBottom: '1px solid lightgray'};
              return (
                <tr style={{ cursor: 'pointer'}} key={data.id}>
                  <LinkTd to={loc} style={s1}>{index + 1}</LinkTd>
                  <LinkTd to={loc} style={s2}>{data.title}</LinkTd>
                  <LinkTd to={loc} style={s1}>{data.writer}</LinkTd>
                  <LinkTd to={loc} style={s1}>{data.commentCount}</LinkTd>
                  <LinkTd to={loc} style={s1}>{data.view}</LinkTd>
                  <LinkTd to={loc} style={s1}>{data.like}</LinkTd>
                  <LinkTd to={loc} style={s1}>{data.date}</LinkTd>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
  )
}

export default UserBoardPost;