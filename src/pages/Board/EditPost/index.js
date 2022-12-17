import React, { useRef, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { GetAxios, PutAxios, serverAxios } from '../../../axios/serverAxios';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import "./EditPost.css";

const EditPost = () => {
    const editorRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const [content, setContent] = useState("");
    const [postTitle, setPostTitle] = useState("");

    const postId = location.pathname.split("/")[4];

    useEffect(() => {
        const fetchData = async () => {
            const url = `/api/board/frees/${postId}`;

            try {
                const res = await GetAxios({url: url});
                setContent(res.content);
                setPostTitle(res.title);
            } catch (error){
                navigate('/bad');
            }
            
        }
        fetchData();
    }, []);

    const handleUpdate = async (e) => {
        const url = `/api/board/frees/${postId}`;
        const data = {
            title: postTitle,
            content: content
        }
        try{
            await PutAxios({url: url, data: data});
        } catch (error){
            navigate('/bad');
        }

        navigate(`/board/frees/${postId}`);
    }

    const handleChange = () => {
        if (editorRef.current) {
            setContent(editorRef.current.getInstance().getHTML());
        }
    }

    const handleTitleChange = (e) => {
        setPostTitle(e.target.value);
    }

    const handleDeleteClick = async () => {
        await serverAxios({
            url: `/api/board/frees/${postId}`,
            method: 'delete'
        })
        .then((response) => {
            navigate('/board/frees');
        })
        .catch((error) => {
            console.log(error);
            navigate("/bad");
        })
    }

    return (
        <div className='writepost-container'>
            <h1 style={{ marginLeft: '20%' }}>글수정</h1>
            <form style={{ width: '80%', border: '1px solid black', margin: 'auto' }}>
                <div style={{ width: '100%' }}>
                    <input style={{ width: '90%' }} type='text' onChange={handleTitleChange} value={postTitle} />
                </div>
                <div style={{ zIndex: '-1', border: '1px solid black' }}>
                    {content && <Editor
                        initialValue={content}
                        previewStyle="vertical"
                        height="500px"
                        initialEditType="wysiwyg"
                        ref={editorRef}
                        onChange={handleChange}
                    >
                    </Editor>
                    }
                </div>
                <button type='button' onClick={() => handleUpdate()}>수정하기</button>
                <button type='button' onClick={() => handleDeleteClick()}>삭제하기</button>
            </form>
        </div>
    )
}

export default EditPost