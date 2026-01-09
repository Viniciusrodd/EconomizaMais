/* eslint-disable react-hooks/exhaustive-deps */

// import css
import styles from '@styles/pages/Homepage.module.css';

// import images
//import leftArrow_img from '@images/utils/left_arrow.png';
//import rightArrow_img from '@images/utils/right_arrow.png';
//import loading_img from '@images/utils/loading.png';

// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import Modal from '@components/Modal';

// import interfaces
import type { iModalConfig } from '@interfeces/frontend/Modal.interface';
import type { 
   MonthlyConsumptionResponseDTO
} from '@DTOs/monthlyConsumption.dtos';

// import hooks
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// import services
import { tariffService } from '@services/Tariffs.service';
import { monthlyConsumptionService } from '@services/MonthlyConsumption.service';

// import context
import { LoadingContext } from '@contexts/Loading/Loading.context';



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
   const [ energy_tariff, setEnergy_tariff ] = useState<number>(0);
   const [ water_tariff, setWater_tariff ] = useState<number>(0);
   const [ gas_tariff, setGas_tariff ] = useState<number>(0);
   const [ monthConsList, setMonthConsList ] = useState<MonthlyConsumptionResponseDTO[]>([]);


   //// contexts
   const { /*loading,*/ setLoading } = useContext(LoadingContext);


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
      if(modal_event === 'tariffs_notfound') navigate('/tarifas');
      if(modal_event === 'monthCons_notfound') navigate('/consumosMensais');
   };

   // fetch tariffs
   const fetchTariffs = async () => {
      setLoading(true);

      const response = await tariffService.getTariffService();
      if(!response) throw new Error('❌ Erro ao achar tarifas');

      // set tariffs
      setEnergy_tariff(response.energy_tariff);
      setWater_tariff(response.water_tariff);
      setGas_tariff(response.gas_tariff);
      setLoading(false);
   };

   // fetch monthly consumptions
   const fetchMonthCons = async () => {
      setLoading(true);

      const response = await monthlyConsumptionService.getMonthConsService();
      if(!response) throw new Error('❌ Erro ao achar meses de consumo');

      // sort datas
      const sortedResponse = [...response].sort((a, b) => {
         const dateA = new Date(a.year, a.month - 1).getTime();
         const dateB = new Date(b.year, b.month - 1).getTime();
         return dateA - dateB; // (older → latest)
      });

      // set month cons
      setMonthConsList(sortedResponse);
   };

   // check tariffs + month cons
   useEffect(() => {
      const getTariffs = async () => {
         try{
            await fetchTariffs();
         }
         catch(error){
            console.error('❌ Error at check tariffs: ', error);
            
            // call btt1 event
            setModal_event('tariffs_notfound');
            
            modal_config({
               title: 'Espere ❕', 
               msg: `${ error }! \n Registre agora suas Tarifas de consumo`, 
               btt1: 'Registrar', btt2: false, display: true
            });
         }
      };

      const getMonthCons = async () => {
         try{
            await fetchMonthCons();
         }
         catch(error){
            console.error('❌ Error at check monthly consumptions: ', error);
            
            // call btt1 event
            setModal_event('monthCons_notfound');
            
            modal_config({
               title: 'Espere ❕', 
               msg: `${ error }! \n Registre agora seu mês de consumo`, 
               btt1: 'Registrar', btt2: false, display: true
            });
         }
      };

      getTariffs();
      getMonthCons();
   }, []);


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
            modalEvent={ modalEventHandler }
         />     
     
         {/* navbar */}
         <Navbar />

         <div className='homepage'>
            {/* sidebar */}
            <Sidebar />
            
            <div className={ styles.data_container }>
               <div className={ styles.data }>

               </div>
            </div>
         </div>
      </div>
   );
};

export default Homepage;