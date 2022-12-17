import React from 'react'

const Nickname = () => {
    return (
        <div className='profile-content__aka'>
            <div className='profile-content__title'>
                <span>닉네임 변경</span>
            </div>
            <div className='profile-aka'>
                <input className='profile-aka__input' type="text" />
            </div>
            <div className='profile-save'>
                <button className='profile-btn__save' type='button'>
                    변경하기
                </button>
            </div>
        </div>

    )
}

export default Nickname