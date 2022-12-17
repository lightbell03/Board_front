import React, { useRef } from 'react'
import { PutAxios } from '../../../../axios/serverAxios';

const ProfileImage = ({profileImage, setProfileImage}) => {
    const fileInputRef = useRef(null);

    const handleToggleClick = (e) => {
        fileInputRef.current.click();
    }

    const handleChange = async (e) => {
        if (e.target.files.length == 0)
            return;

        let base64file;
        await convertBase64(e.target.files[0])
            .then((data) => {
                base64file = data;
            });

        setProfileImage(base64file);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            }

            fileReader.onerror = (error) => {
                reject(error);
            }
        });
    }

    const saveProfileImage = async () => {
        const url = '/api/member/thumbnail';
        const data = {
            profileImage: profileImage
        }

        await PutAxios({ url: url, data: data });
        window.location.reload();
    }

    return (
        <div>
            <div className='profile-content__title'>
                <span>프로필 이미지 변경</span>
            </div>
            <div className='profile-content__thumnail'>
                <button
                    className='profile-btn__chthum'
                    type='button'
                    onClick={handleToggleClick}
                >
                    <img className='profile-img__chthum' src={profileImage} width='100%' height='100%' />
                </button>
                <input
                    type='file'
                    ref={fileInputRef}
                    accept='image/jpg,impge/png,image/jpeg'
                    onChange={handleChange}
                    style={{ display: 'none' }}
                />
            </div>
            <div className='profile-save'>
                <button className='profile-btn__save' type='button' onClick={() => saveProfileImage()}>
                    저장하기
                </button>
            </div>
        </div>
    )
}

export default ProfileImage