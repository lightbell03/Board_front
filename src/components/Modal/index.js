import React, { useRef, useEffect } from 'react'
import './Modal.css';

const Modal = ({setModal, children}) => {

    const modalRef = useRef();

    useEffect(() => {
        document.addEventListener("mousedown", clickOutside);

        return () => {
            document.removeEventListener("mousedown", clickOutside);
        }
    }, [modalRef]);

    const clickOutside = (e) => {
        if (!modalRef.current || modalRef.current.contains(e.target)) {
            return;
        }
        else {
            setModal(false);
        }
    }

    return (
        <div className='loginmodal_container'>
            <div className='loginmodal_modal' ref={modalRef}>
                {children}
            </div>
        </div>
    )
}

export default Modal;