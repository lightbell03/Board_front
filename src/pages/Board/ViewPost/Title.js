import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserInfoContext } from '../../../context/context';

const Title = ({item, postId}) => {

    const [contextUserInfo, setContextUserInfo] = useContext(UserInfoContext);

    return (
        <div style={{ paddingTop: '100px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '80%', paddingTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '4rem' }}>{item.title}</span>
                    {item.writer == contextUserInfo.username &&
                        <Link to={`/board/frees/edit/${postId}`}>
                            수정
                        </Link>
                    }
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <span>{item.writer}</span>
                    </div>
                    <div>
                        <div>
                            <span>등록일 : {item.date}</span>
                        </div>
                        <div style={{ alignSelf: 'flex-end' }}>
                            <span>조회수 : {item.view}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Title