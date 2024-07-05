import React from 'react';

// CSS
import '../../css/modal.css'

const Modal = ({ children, onClose }) => {
    return (
        <div className='modal__container'>
            {children}

            <div className='item__cerrar'>
                <button className='modal__button no-margin' onClick={onClose}>X</button>
            </div>
        </div>
     
    );
};

export default Modal;