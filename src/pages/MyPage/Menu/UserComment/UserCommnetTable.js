import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import LinkTd from '../../../../components/LinkTd';
import { GetAxios } from '../../../../axios/serverAxios';

const CommentTable = () => {

    const headersName = ['게시글', '작성 댓글', '좋아요', '등록일'];
    const columnWidth = ['30%', '50%', '10%', '10%'];

    const [params] = useSearchParams();
    const navigate = useNavigate();

    const [freeComment, setFreeComment] = useState([]);
    const [musicComment, setMusicComment] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(() => {
        const fetchDate = async () => {
            const url = `/api/member/comments`;
            const res = await GetAxios({ url: url });

            res.map((data) => {
                if (data.boardType === "frees") {
                    setFreeComment(prev => [...prev, data]);
                }
                else if (data.boardType === "musics") {
                    setMusicComment(prev => [...prev, data]);
                }
            })
        }
        
        fetchDate();
        
        return () => {
            setFreeComment([]);
            setMusicComment([]);
        }
    }, []);

    useEffect(() => {
        setCommentHandler();
    }, [freeComment, params]);

    const setCommentHandler = () => {
        const category = params.get("category");

        if(category === "free"){
            setComment(freeComment);
        }
        else if(category === "music"){
            setComment(musicComment);
        }
        else{
            navigate('/bad');
        }
    }


    return (
        <table style={{ width: '100%' }}>
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
                {comment && comment.map((data, index) => {
                    const touri = `/board/${params.get("category")}s/${data.boardId}`
                    return (
                        <tr key={index}>
                            <LinkTd to={touri}>{data.boardTitle}</LinkTd>
                            <LinkTd to={touri}>{data.content}</LinkTd>
                            <LinkTd to={touri}>{data.like}</LinkTd>
                            <LinkTd to={touri}>{data.date}</LinkTd>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default CommentTable