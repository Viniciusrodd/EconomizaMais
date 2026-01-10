
// import css
import styles from '@styles/pages/BaseDatas.module.css';

// import images
import user_img from '@images/homepage/user.png';
import download_img from '@images/historic/download.png';
import tariff_img from '@images/historic/tariffs.png';
import calendar_img from '@images/historic/calendar.png';
import loading_img from '@images/utils/loading.png';

// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import Modal from '@components/Modal';

// import interfaces
import type { iModalConfig } from '@interfeces/frontend/Modal.interface';

// import hooks
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

// import services
import { exportHistoryService } from '@services/ExportHistory.service';

// import contexts
import { LoadingContext } from '@contexts/Loading/Loading.context';



// export history
const ExportHistory = () => {
   //// variables
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);


   //// contexts
   const { loading, setLoading } = useContext(LoadingContext);


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
      const response = await exportHistoryService.createHistoryService();
      if(!response) throw new Error('❌ Erro ao criar o PDF');
   };

   // get history
   const getHistory = async () => {
      const response = await exportHistoryService.getHistoricService();
      if(!response) throw new Error('❌ Erro ao buscar histórico');
      return response;
   };

   // history download
   const historyDownload = async (id: string) => {
      if(!id) throw new Error('❌ ID do histórico inválido');;

      await exportHistoryService.downloadPdfService(id);
   };

   // download handler
   const downloadHandler = async () => {
      setLoading(true);

      try{
         await pdfCreation();
         const history = await getHistory();
         await historyDownload(history.id);

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Download de histórico feito`, 
            btt1: false, btt2: false, display: true
         });

         setTimeout(() => {
            closeModal();
            setLoading(false);
         }, 4000);
      }
      catch(error){
         console.error('❌ Error at download flow: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: error instanceof Error ? error.message : 'Erro inesperado', 
            btt1: false, btt2: 'Tentar novamente', display: true
         });

         setLoading(false);
      }
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
                  { loading ? (
                     <>
                        <img 
                           src={ loading_img } 
                           alt="loading_png"
                           className='loading_img' 
                        />
                        <p className='loading_msg'>
                           Carregando...
                        </p>
                     </>
                  ) : (
                     <div className={ styles.download_container } onClick={ downloadHandler }>
                        <h1>Baixar histórico</h1>
                        <img src={ download_img } alt="download_img" />
                     </div>
                  ) }

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