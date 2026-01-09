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
   MonthlyConsumptionResponseDTO,
   MonthlyConsumptionSummaryDTO
} from '@DTOs/monthlyConsumption.dtos';
import type { TariffResponseDTO } from '@DTOs/Tariffs.dtos';

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
   const [ tariffs, setTariffs ] = useState<TariffResponseDTO>();
   const [ monthConsList, setMonthConsList ] = useState<MonthlyConsumptionResponseDTO[]>([]);
   const [ energySummary, setEnergySummary ] = useState<MonthlyConsumptionSummaryDTO>();
   const [ waterSummary, setWaterSummary ] = useState<MonthlyConsumptionSummaryDTO>();
   const [ gasSummary, setGasSummary ] = useState<MonthlyConsumptionSummaryDTO>();


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
      const response = await tariffService.getTariffService();
      if(!response) throw new Error('❌ Erro ao achar tarifas');

      // set tariffs
      setTariffs(response);
   };

   // fetch monthly consumptions
   const fetchMonthCons = async () => {
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

   // fetch monthly consumptions summary
   const fetchMonthConsSummary = async () => {
      // energy
      const energy_response = await monthlyConsumptionService.getMonthConsSummaryService('energy_kwh');
      if(!energy_response) throw new Error('❌ Erro ao achar resumo de consumos de energia');
      setEnergySummary(energy_response);

      // water
      const water_response = await monthlyConsumptionService.getMonthConsSummaryService('water_m3');
      if(!water_response) throw new Error('❌ Erro ao achar resumo de consumos de água');
      setWaterSummary(water_response);

      // gas
      const gas_response = await monthlyConsumptionService.getMonthConsSummaryService('gas_m3');
      if(!gas_response) throw new Error('❌ Erro ao achar resumo de consumos de gás');
      setGasSummary(gas_response);
   };

   // check datas
   useEffect(() => {
      // tariffs
      const getTariffs = async () => {
         setLoading(true);

         try{
            await fetchTariffs();
            setLoading(false);
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

            setLoading(false);
         }
      };

      // monthly consumptions
      const getMonthCons = async () => {
         setLoading(true);

         try{
            await fetchMonthCons();
            setLoading(false);
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

            setLoading(false);
         }
      };

      // monthly consumptions summary
      const getMonthConsSummary = async () => {
         setLoading(true);

         try{
            await fetchMonthConsSummary();
            setLoading(false);
         }
         catch(error){
            console.error('❌ Error at check monthly consumptions summary: ', error);
            
            modal_config({
               title: 'Erro ❌', 
               msg: `${ error }`, 
               btt1: false, btt2: 'Tentar novamente', display: true
            });

            setLoading(false);
         }
      };

      getTariffs();
      getMonthCons();
      getMonthConsSummary();
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
                  <p>{ tariffs?.energy_tariff }</p>
                  <p>{ tariffs?.water_tariff }</p>
                  <p>{ tariffs?.gas_tariff }</p>

                  { monthConsList && monthConsList.map(month => (
                     <p>{ month.month } - { month.year }</p>
                  )) }

                  <p>{ energySummary?.average_consume }</p>
                  <p>{ waterSummary?.average_consume }</p>
                  <p>{ gasSummary?.average_consume }</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Homepage;