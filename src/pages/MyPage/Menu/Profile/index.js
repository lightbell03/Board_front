import React, { useState, useContext, useEffect } from 'react'

import { UserInfoContext } from '../../../../context/context';
import Nickname from './Nickname';

import './Profile.css';
import ProfileImage from './ProfileImage';

const Profile = () => {

  const [contextUserInfo, setContextUserInfo] = useContext(UserInfoContext);

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    setProfileImage(contextUserInfo.profileImage);
  }, []);


  return (
    <div className='profile-container'>
      <div className='profile-content'>
        <ProfileImage contextUserInfo={contextUserInfo}
          setContextUserInfo={setContextUserInfo}
          profileImage={profileImage}
          setProfileImage={setProfileImage} />
        <Nickname />
      </div>
    </div>
  )
}

export default Profile;