import React from 'react';

// CSS
import '../../css/modal2.css'

const Modal = ({ children }) => {
    return (
        <div className='modal__container'>
            <div className='modal__content'>

                {/* <div className='modal__cerrar'>
                    <button className='modal__button no-margin' onClick={onClose}>X</button>
                </div> */}

                {children}

                
            </div>
            
        </div>
    );
};

export default Modal;
