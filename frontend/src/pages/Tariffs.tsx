
// import css
import styles from '@styles/pages/Tariffs.module.css';

// import images
import navigation_img from '@images/utils/navigator.png';

// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import Modal from '@components/Modal';

// import interfaces
import type { iModalConfig } from '@interfeces/frontend/Modal.interface';

// import hooks
import { useState } from 'react';


// tariffs
const Tariffs = () => {
   //// variables
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);


   //// functions
   
   
   // modal config
   const modal_config = ({ title, msg, btt1, btt2, display }: iModalConfig) => {
      setModal_title(title ?? '');
      setModal_msg(msg ?? '');
      setmodal_btt(btt1 ?? false);
      setModal_btt_2(btt2 ?? false);
      setModal_display(display ?? false);
   };   

   // close modal
   const closeModal = () =>{
      modal_config({
         title: '', msg: '', btt1: false, 
         btt2: false, display: false
      });
   };


   //// jsx


   return (
      <div className='container'>
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt1={ modal_btt }
            btt2={ modal_btt_2 }
            display={ modal_display }
            onClose={ closeModal }
         />   

         {/* navbar */}
         <Navbar />

         <div className='homepage'>
            {/* sidebar */}
            <Sidebar />
            
            <div className={ styles.data_container }>
               <button type='button'>
                  ADICIONAR TARIFAS
               </button>

               <div className={ styles.data }>
                  <h1>Tarifas atuais</h1>

                  <div className={ styles.tariffs }>
                     <div className={ `${styles.cards} ${styles.energy}` }>
                        <h1>Tarifa de Energia</h1>

                        <h2>0.80 Kwh</h2>
                     </div>
                     <div className={ `${styles.cards} ${styles.water}` }>
                        <h1>Tarifa de Água</h1>

                        <h2>6.50 m3</h2>                     
                     </div>
                     <div className={ `${styles.cards} ${styles.gas}` }>
                        <h1>Tarifa de Gás</h1>

                        <h2>8.00 m3</h2>
                     </div>
                  </div>
               </div>

               <div className={ styles.info }>
                  <h2>Conferir estatísticas de tarifas</h2>
                  <img src={ navigation_img } alt="navigation_img" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Tariffs;