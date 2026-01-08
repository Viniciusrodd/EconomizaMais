
// import css
import styles from '@styles/pages/BaseDatas.module.css';

// import images
import user_img from '@images/homepage/user.png';
import download_img from '@images/historic/download.png';
import tariff_img from '@images/historic/tariffs.png';
import calendar_img from '@images/historic/calendar.png';

// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import Modal from '@components/Modal';

// import interfaces
import type { iModalConfig } from '@interfeces/frontend/Modal.interface';
import type { HistoriesResponseDTO } from '@DTOs/ExportHistory.dtos';

// import hooks
import { useState, /*useEffect*/ } from 'react';
import { Link } from 'react-router-dom';

// import services
import { exportHistoryService } from '@services/ExportHistory.service';



// export history
const ExportHistory = () => {
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

   // pdf creation
   const pdfCreation = async () => {
      try{
         const response = await exportHistoryService.createHistoryService();
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
            return;
         }
         console.log('✔️ PDF creation');
      }
      catch(error){
         console.error('❌ Error at create PDF: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: `${ error }`, 
            btt1: false, btt2: 'Tentar novamente', display: true
         });
      }
   };

   // get history
   const getHistory = async () => {
      try{
         const response: HistoriesResponseDTO = await exportHistoryService.getHistoriesService();
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
            return;
         }
         console.log('✔️ History get');
         return response;
      }
      catch(error){
         console.error('❌ Error at get history: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: `${ error }`, 
            btt1: false, btt2: 'Tentar novamente', display: true
         });
      }
   };

   // history download
   const historyDownload = async (id: string) => {
      if(!id) return;

      try{
         const response = await exportHistoryService.downloadPdfService(id);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
            return;
         }
         console.log('✔️ History download');
      }
      catch(error){
         console.error('❌ Error at download history: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: `${ error }`, 
            btt1: false, btt2: 'Tentar novamente', display: true
         });
      }
   };

   // download handler
   const downloadHandler = async () => {
      await pdfCreation;
      const history = await getHistory();
      await historyDownload(history!.id);
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
                  <div className={ styles.download_container } onClick={ downloadHandler }>
                     <h1>Baixar histórico</h1>
                     <img src={ download_img } alt="download_img" />
                  </div>

                  <div className={ styles.data }>
                     <h1>Dados contidos no histórico</h1>

                     <div className={ styles.data_registers }>
                        <div className={ `${styles.cards} ${styles.cards_2}` }>
                           <img src={ user_img } alt="user_img" />
                           <p>Dados de usuário</p>

                           <Link to='/usuario'>
                              <button type='button'>
                                 CONFERIR
                              </button>
                           </Link>
                        </div>
                        <div className={ `${styles.cards} ${styles.cards_2}` }>
                           <img src={ tariff_img } alt="tariff_img" />
                           <p>Tarifas configuradas</p>

                           <Link to='/tarifas'>
                              <button type='button'>
                                 CONFERIR
                              </button>
                           </Link>                       
                        </div>
                        <div className={ `${styles.cards} ${styles.cards_2}` }>
                           <img src={ calendar_img } alt="calendar_img" />
                           <p>Meses de consumo</p>

                           <Link to='/consumosMensais'>
                              <button type='button'>
                                 CONFERIR
                              </button>
                           </Link>                     
                        </div>
                     </div>
                  </div>
               </div>
         </div>
      </div>
   );
};

export default ExportHistory;