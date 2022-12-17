import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DeleteAxios, GetAxios, PutAxios, serverAxios } from '../../../axios/serverAxios';
import addIcon from '../../../resource/add.png';
import DeleteIcon from '../../../resource/delete.png';

const MarketEdit = () => {

  const selImgRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const marketId = location.pathname.split("/")[4];

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/board/markets/${marketId}`;
      const res = await GetAxios({ url: url });

      setTitle(res.title);
      setPrice(res.price);
      setContent(res.content);
      setCategory(res.category);

      res.imageUrls.map((data) => {
        toDataURL(data)
          .then(dataUrl => {
            setImages(prev => [...prev,
              dataUrl
            ]);
          })
      });
    }
    fetchData();
  }, [])

  const handleClick = () => {
    selImgRef.current.click();
  }

  const handleUpdate = async () => {
    const url = `/api/board/markets/${marketId}`;
    const data = {
      images: images,
        title: title,
        price: price,
        category: category,
        content: content
    }

    await PutAxios({url: url, data: data});

    navigate(`/board/markets/${marketId}`);
  }

  const handleDelete = async () => {
    const url = `/api/board/markets/${marketId}`;
    await DeleteAxios({url: url});
    navigate(-2);
  }

  const imageUpload = (e) => {
    if (images.length == 10) {
      return;
    }

    let fileArr = e.target.files;

    for (let i = 0; i < fileArr.length; i++) {
      let file = fileArr[i];
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log(reader.result);
        setImages(prev => [...prev, reader.result]);
      }
    }
  }

  /**
   * image url -> base64 encoding
   * @param {image url}} url 
   * @returns 
   */
  const toDataURL = (url) =>
    serverAxios({
      url: url,
      method: 'get',
      responseType: "blob"
    })
      .then(response => response.data)
      .then(data => new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(data);
      }))

  const deleteImage = (data) => {
    let newImage = images.filter((image) => {
      return image !== data;
    });

    setImages(newImage);
  }

  return (
    <main style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '80%' }}>
        <div>
          <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', border: '1px dashed black', marginTop: '25px', cursor: 'pointer' }} onClick={handleClick}>
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
                  <div key={index}>
                    <button style={{ position: 'relative', width: '30px', left: '80%', top: '15px', cursor: 'pointer', border: 'none', background: 'transparent' }} onClick={() => deleteImage(data)}>
                      <img style={{ objectFit: 'cover' }} width='100%' src={DeleteIcon} />
                    </button>
                    <div style={{ margin: '0px 10px', border: '1px solid lightgray' }}>
                      <img width='100' height='100' style={{ objectFit: 'cover' }} src={data} />
                    </div>
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
                <input type='text' style={{ textAlign: 'right', width: '200px', height: '30px', fontSize: '2rem', borderTopStyle: "hidden", borderLeftStyle: 'hidden', borderRightStyle: 'none', outline: 'none' }} value={price} onChange={(e) => setPrice(e.target.value)} />
                <span style={{ fontSize: '1.5rem' }}>원</span>
              </div>
            </div>
            <div style={{ margin: '25px 50px' }}>
              <div>
                <span> 카테고리</span>
                <div>
                  <select style={{ width: '200px', height: '35px', fontSize: '1.3rem' }} defaultValue={category} name='category' onChange={(e) => setCategory(e.target.value)}>
                    <option value='none' selected>선택</option>
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
            <textarea rows='10' cols='100' style={{ fontSize: '1.2rem' }} value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
        </div>

        <div>
          <button onClick={() => handleUpdate()}>수정하기</button>
          <button onClick={() => handleDelete()}>삭제하기</button>
        </div>
      </div>
    </main>
  )
}

export default MarketEdit