
// import css
import styles from '@styles/pages/Homepage.module.css';

// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import Modal from '@components/Modal';

// import interfaces
import type { iModalConfig } from '@interfeces/frontend/Modal.interface';

// import hooks
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import services
import { tariffService } from '@services/Tariffs.service';


// homepage
const Homepage = () => {
   //// variables
   const navigate = useNavigate();
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const [ modal_event, setModal_event ] = useState<string>('');


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

   // modal event handler
   const modalEventHandler = () => {
      if(modal_event === 'not_found'){
         nextBtt();
      }
   };

   // next btt
   const nextBtt = () => {
      navigate('/tarifas');
   };

   // check tariffs
   useEffect(() => {
      const getTariffs = async () => {
         try{
            const response = await tariffService.getTariffService();
            if(!response){
               console.error('⚠️ Unexpected return from API:', response);
            }
         }
         catch(error){
            console.error('❌ Error at check tariffs: ', error);
            
            // call btt1 event
            setModal_event('not_found');

            modal_config({
               title: 'Espere ❕', 
               msg: `${ error }! \n Registre agora suas Tarifas de consumo`, 
               btt1: 'REGISTRAR', btt2: false, display: true
            });
         }
      };
      getTariffs();
   }, []);


   //// jsx


   return (
      <div className={ styles.container }>
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt1={ modal_btt }
            btt2={ modal_btt_2 }
            display={ modal_display }
            onClose={ closeModal }
            modalEvent={ modalEventHandler }
         />     
     
         {/* navbar */}
         <Navbar />

         <div className={ styles.homepage }>
            {/* sidebar */}
            <Sidebar />
            
         </div>
      </div>
   );
};

export default Homepage;