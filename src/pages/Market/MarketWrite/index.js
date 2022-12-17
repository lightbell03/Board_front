import React, { useState, useRef } from 'react'
import { PostAxios} from '../../../axios/serverAxios';
import { useNavigate } from 'react-router-dom';

import addIcon from '../../../resource/add.png';
import './MarketWrite.css';

export const MarketWrite = () => {

    const naviagete = useNavigate();
    const selImgRef = useRef();

    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const handleClick = () => {
        selImgRef.current.click();
    }

    const handleSave = async () => {
        const url = `/api/board/markets`;
        const data = {
            images: images,
            title: title,
            price: price,
            category: category,
            content: content
        };

        const res = await PostAxios({url: url, data: data});
        naviagete(`/board/markets/${res.id}`);
    }

    const imageUpload = (e) => {
        if (images.length == 10) {
            alert("이미지는 10장을 넘어갈 수 없습니다.");
            return;
        }
        let fileArr = e.target.files;

        for (let i = 0; i < fileArr.length; i++) {
            let file = fileArr[i];
            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setImages(prev => [...prev, reader.result]);
            }
        }
    }

    return (
        <main style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '80%' }}>
                <div>
                    <span>글쓰기</span>
                </div>
                <div>
                    <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', border: '1px dashed black', cursor: 'pointer' }} onClick={handleClick}>
                        <div>
                            <img width='40px' height='40px' style={{ objectFit: 'contain' }} src={addIcon} />
                            <div style={{ textAlign: 'center' }}>
                                <span>{images.length}/10</span>
                            </div>
                            <input type='file' multiple ref={selImgRef} onChange={imageUpload} hidden />
                        </div>
                    </div>
                    <div style={{ marginLeft: '20px', display: 'flex', overflowX: 'scroll' }}>
                        {
                            images.map((data, index) => {
                                return (
                                    <div key={index} style={{ margin: '0px 10px', border: '1px solid lightgray' }}>
                                        <img width='100' height='100' style={{ objectFit: 'cover' }} src={data} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ margin: '25px 50px' }}>
                            <span>금액</span>
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <input type='text' style={{ textAlign: 'right', width: '200px', height: '30px', fontSize: '2rem', borderTopStyle: "hidden", borderLeftStyle: 'hidden', borderRightStyle: 'none', outline: 'none' }} value={price} onChange={(e) => setPrice(e.target.value)}/>
                                <span style={{ fontSize: '1.5rem' }}>원</span>
                            </div>
                        </div>
                        <div style={{ margin: '25px 50px' }}>
                            <div>
                                <span> 카테고리</span>
                                <div>
                                    <select style={{ width: '200px', height: '35px', fontSize: '1.3rem' }} defaultValue='none' name='category' onChange={(e) => setCategory(e.target.value)}>
                                        <option value='none'>선택</option>
                                        <option value='electric'>전자기기</option>
                                        <option value='manCloth'>남성의류</option>
                                        <option value='womanCloth'>여성의류</option>
                                        <option value='stuff'>잡화</option>
                                        <option value='furniture'>가전제품</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <span>내용</span>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <textarea rows='10' cols='100' style={{ fontSize: '1.2rem' }} value={content} onChange={(e) => setContent(e.target.value)}/>
                    </div>
                </div>

                <div>
                    <button onClick={handleSave}>글쓰기</button>
                </div>
            </div>
        </main>
    )
}