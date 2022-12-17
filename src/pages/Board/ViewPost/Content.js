import React from 'react'
import { PostAxios } from '../../../axios/serverAxios';
import { useCookies } from 'react-cookie';
import ThumbUpImage from '../../../resource/thumbup.png';
import { Viewer } from '@toast-ui/react-editor';

const Content = ({ item, setItem, postId, setModal }) => {

    const [cookies, setCookie] = useCookies();

    const handleLikeClick = async () => {
        if (cookies["login"] === undefined) {
            setModal(true);
            return;
        }
        const url = `/api/like/${postId}`;

        try {
            await PostAxios({ url: url });
            setItem({ ...item, like: item.like + 1 });
        }
        catch (error) {
            if (error === 401) {
                console.log(error);
                setModal(true);
            }
            else if (error === 423) {
                alert("게시물하나에 한번의 추천밖에 누를 수 없습니다.")
            }
        }
    }

    return (
        <>
        <div>
          {item.content &&
            <div style={{ borderTop: '1px solid black', paddingTop: '50px' }}>
              <Viewer initialValue={item.content} />
            </div>
          }
        </div>
        <div style={{ height: '80px', display: 'flex', marginBottom: '10px', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '80px', background: 'rgb(207, 245, 201)', borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ color: 'blue' }}>{item.like}</span>
            </div>
            <button style={{ background: 'none', border: 'none', marginLeft: '10px', width: '60px', height: '60px', paddingBottom: '15px', cursor: 'pointer' }} onClick={() => handleLikeClick()}>
                <img width='100%' height='100%' src={ThumbUpImage} style={{ objectFit: 'fill' }} />
            </button>
        </div>
        </>
    )
}

export default Content