import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Main = () => {

  const navigation = useNavigate();

  useEffect(() => {
    navigation("/board/frees/")  
  })
  return (
    <>
    </>
  )
}

export default Main