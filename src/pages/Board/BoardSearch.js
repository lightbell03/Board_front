import React, {useState} from 'react'
import { useSearchParams } from 'react-router-dom';
import searchLogo from '../../resource/search.png';

const BoardSearch = ({fetchData}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchText, setSearchText] = useState("");

    const handleClick = () => {
        const param = {
            search : searchText
        }
        fetchData(param);
        setSearchParams({search_keyword : searchText});
    }

    return (
        <div className='free-search__container'>
            <div className='free-search__content'>
                <input className='free-search__input' type='text' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button className='free-search__button' type='button' onClick={() => handleClick()}>
                    <img width='20' style={{ objectFit: 'cover' }} src={searchLogo}></img>
                </button>
            </div>
        </div>
    )
}

export default BoardSearch