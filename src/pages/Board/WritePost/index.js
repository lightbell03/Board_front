import React, { useState, useRef } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { PostAxios, serverAxios } from '../../../axios/serverAxios';

import './WritePost.css';

const WritePost = () => {

    const editorRef = useRef();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const [content, setContent] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [genre, setGenre] = useState("");

    const boardType = location.pathname.split("/")[2];

    const handleClick = async (e) => {
        let url;
        let data;
        if (boardType === "frees") {
            url = "/api/board/frees";
            data = {
                title: postTitle,
                content: content
            }
        }
        else if (boardType === "musics") {
            url = "/api/board/musics";
            data = {
                title: postTitle,
                content: content,
                genre: genre
            }
        }

        await PostAxios({ url: url, data: data });
        navigate(`/board/${boardType}`);
    }

    const handleChange = () => {
        if (editorRef.current) {
            setContent(editorRef.current.getInstance().getHTML());
        }
    }

    const handleTitleChange = (e) => {
        setPostTitle(e.target.value);
    }

    return (
        <div className='writepost-container'>
            <h1 style={{ marginLeft: '20%' }}>글작성</h1>
            <form style={{ width: '80%', margin: 'auto' }}>
                {
                    boardType === "musics" &&
                <select style={{ width: '200px', height: '35px', fontSize: '1.3rem' }} defaultValue='none' name='category' onChange={(e) => setGenre(e.target.value)}>
                    <option value='pop'>팝</option>
                    <option value='rock'>락</option>
                    <option value='hip/hop'>힙합</option>
                    <option value='r&b'>R&B</option>
                    <option value='fork'>포크</option>
                    <option value='jazz'>재즈</option>
                    <option value='alternative'>alternative</option>
                    <option value='etc'>기타</option>
                </select>
}
                <div style={{ width: '100%' }}>
                    <input style={{ width: '90%' }} type='text' onChange={handleTitleChange} value={postTitle} placeholder='제목을 입력해주세요' />
                </div>
                <div style={{ zIndex: '-1', border: '1px solid black' }}>
                    <Editor
                        placeholder="내용을 입력해주세요."
                        previewStyle="vertical"
                        height="500px"
                        initialEditType="wysiwyg"
                        ref={editorRef}
                        onChange={handleChange}
                    >
                    </Editor>
                </div>
                <div>
                    <button type='button' onClick={handleClick}>글쓰기</button>
                </div>
            </form>
        </div>
    )
}

export default WritePost