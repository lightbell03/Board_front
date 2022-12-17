import React from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const BoardWrite = ({setModal}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["login"]);
    const [searchParams, setSearchParams] = useSearchParams();

    const typeParam = searchParams.toString();
    const curLoc = location.pathname;

    const handleClick = async () => {
        if (cookies["login"] === undefined) {
          setModal(true);
          return;
        }
        navigate(`${curLoc}/post?${typeParam}`);
      }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <button onClick={() => handleClick()}>글작성</button>
          </div>
  )
}

export default BoardWrite