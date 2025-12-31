
// import css
import styles from '@styles/components/Modal.module.css';

// import interfaces
import type { iModal } from '@interfeces/Modal.interface';

// import hooks
import type React from 'react';


// modal
const Modal: React.FC<iModal> = ({ title, msg, btt1, btt2, display, modalEvent, onClose }) => {
   return (
      <div className={ display ? styles.modal : styles.hidden }>
         <div className={ styles.modal_content }>
            <h2 className={styles.h2_modal }>
               { title }
            </h2>
            <p className={ styles.p_modal }>
               { msg }                
            </p>
            {
               btt1 && (
                  <button onClick={ modalEvent } type='button' className={ styles.modal_button }>
                     { btt1 }
                  </button>
               )
            }
            {
               btt2 && (
                  <button onClick={ onClose } type='button' className={ styles.close_modal_button }>
                     { btt2 }
                  </button>
               )
            }
         </div>
      </div>
   );
};

export default Modal;