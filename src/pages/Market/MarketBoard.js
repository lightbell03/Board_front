import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import './MarketBoard.css';
import { GetAxios, serverAxios } from '../../axios/serverAxios';
import Modal from '../../components/Modal';
import LoginModal from '../../components/Modal/LoginModal';

const menuItem = [
    ["all", {
        "kr": "전체",
    }],
    ["electric", {
        "kr": "전자기기"
    }],
    ["manCloth", {
        "kr": "남성의류",
    }],
    ["womanCloth", {
        "kr": "여성의류",
    }],
    ["stuff", {
        "kr": "잡화",
    }],
    ["furniture", {
        "kr": "가구",
    }],
]

const MarketBoard = ({ setSelfLink }) => {
    const [cookies, setCookie] = useCookies(["login"]);
    const [params, setParams] = useSearchParams();

    const [modal, setModal] = useState(false);
    const [page, setPage] = useState({});
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        let categoryParam = params.get('category');
        let page = 0;

        const fetchData = async () => {
            const param = {
                page: page,
                category: categoryParam,
            }

            const res = await GetAxios({ url: '/api/board/markets', param: param });
            setPage(res.page);

            if (res._embedded?.market)
                setItems(res._embedded.market);

        }

        fetchData();

        menuItem.map((data) => {
            if (data[0] == categoryParam) {
                setTitle(data[1]["kr"]);
            }
        });

    }, [params]);

    const handleChange = (e) => {
        setSearchKeyword(e.target.value);
    }

    const handleSearchClick = async () => {
        await serverAxios({
            url: '/board/markets',
            method: 'get',
            params: {
                searchKeyword: searchKeyword
            }
        })
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleWriteClick = (e) => {
        if(cookies["login"] === undefined){
            e.preventDefault();
            setModal(true);
            return;
        }
    }

    return (
        <>
            {modal &&
                <Modal setModal={setModal}>
                    <LoginModal />
                </Modal>}
            <div style={{ marginTop: '20px' }}>
                <div className='market-head'>
                    <div style={{ marginLeft: '40px' }}>
                        <div className='market-head__text'>
                            {title}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '30px' }}>
                            <div>
                                <div>
                                    <input type='text' value={searchKeyword} placeholder="검색어를 입력하세요" onChange={handleChange} />
                                    <button type='button' onClick={() => handleSearchClick()}>검색</button>
                                </div>
                                <div>
                                    <Link to='post?type=market' onClick={handleWriteClick}>
                                        글쓰기
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='market-content__container'>
                    {items.map((data) => {
                        const selfLink = "/" + data._links.self.href.split("/").slice(3).join("/");
                        return (
                            <Link key={data.id} className='market-content__box' to={`${data.id}`} onClick={() => setSelfLink(selfLink)}>
                                <div style={{ height: '60%', margin: '5px', border: '1px solid black' }}>
                                    <img width='100%' height='100%' className='market-content__img' src={data.firstImageUrl} />
                                </div>
                                <div className='market-content__content'>
                                    <div style={{ fontSize: '1.5rem' }}>
                                        {data.title}
                                    </div>
                                    <div>
                                        {data.price}
                                    </div>
                                    <div style={{ paddingTop: '30px', display: 'flex', justifyContent: 'flex-end', paddingRight: '20px', fontSize: '0.8rem' }}>
                                        <div>
                                            찜{data.like}
                                        </div>
                                        <div>
                                            조회수{data.view}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default MarketBoard;