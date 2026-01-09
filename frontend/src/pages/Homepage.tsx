/* eslint-disable react-hooks/exhaustive-deps */

// import css
import styles from '@styles/pages/BaseDatas.module.css';

// import images
import leftArrow_img from '@images/utils/left_arrow.png';
import rightArrow_img from '@images/utils/right_arrow.png';
import loading_img from '@images/utils/loading.png';

// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import Modal from '@components/Modal';
import DonutChart from '@components/DonutChart';

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
   const [ currentIndex, setCurrentIndex ] = useState<number>(0);
   const [ energySummary, setEnergySummary ] = useState<MonthlyConsumptionSummaryDTO>();
   const [ waterSummary, setWaterSummary ] = useState<MonthlyConsumptionSummaryDTO>();
   const [ gasSummary, setGasSummary ] = useState<MonthlyConsumptionSummaryDTO>();
   const months = [ '', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ];


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

   // prev month cons
   const goPrev = () => {
      setCurrentIndex(prev => prev - 1);
   };

   // next month cons
   const goNext = () => {
      setCurrentIndex(prev => prev + 1);
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
            modalEvent={ modalEventHandler }
         />     
     
         {/* navbar */}
         <Navbar />

         <div className='homepage'>
            {/* sidebar */}
            <Sidebar />
            
            <div className={ styles.data_container }>
               <div className={ `${styles.homepage_data_container} ${styles.data}` }>
                  <div className={ styles.data_navigate }>
                     <span className="tooltip tooltip_btt" data-tooltip="Anterior" onClick={ goPrev }>
                        <img
                           src={ leftArrow_img }
                           alt="left_arrow"
                        />
                     </span>
                     
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
                        <h1>
                           Resumos dos meses de consumo de { 
                              currentIndex == 0 ? 'energia' : currentIndex == 1 ? 'água' : currentIndex == 2 ? 'gás' : '' 
                           }
                        </h1>
                     ) }
                     
                     <span className="tooltip tooltip_btt" data-tooltip="Próximo" onClick={ goNext }>
                        <img
                           src={ rightArrow_img }
                           alt="right_arrow"
                        />
                     </span>
                  </div>

                  <div className={ styles.data_registers_2 }>
                     <div className="chart-wrapper">
                        <DonutChart 
                           percent={ 0 }
                        />

                        <div className="legend">
                           <div>
                              <span className="color reduction" /> 
                              Média de consumo: { currentIndex == 0 ? energySummary?.average_consume : currentIndex == 1 ? waterSummary?.average_consume : currentIndex == 2 ? gasSummary?.average_consume : 0 }
                           </div>
                           <div>
                              <span className="color annual" /> 
                              Variação do mês passado: { currentIndex == 0 ? energySummary?.variation_last_month : currentIndex == 1 ? waterSummary?.variation_last_month : currentIndex == 2 ? gasSummary?.variation_last_month : 0 }
                           </div>
                           <div>
                              <span className="color month" /> 
                              Mês de consumo mais alto: { currentIndex == 0 ? energySummary?.highest_consume_month : currentIndex == 1 ? waterSummary?.highest_consume_month : currentIndex == 2 ? gasSummary?.highest_consume_month : 0 }
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className={ styles.homepage_data }>
                  <div className={ styles.registers_data }>
                     <h1 className={ styles.tariffs_title }>
                        Tarifas registradas
                     </h1>

                     <div className={ `${styles.tariffs_container} ${styles.datas_container}` }>
                        <div>
                           <p>
                              <strong>. Tarifa de energia:</strong>...............{ tariffs?.energy_tariff }
                           </p>
                           <p>
                              <strong>. Tarifa de água:</strong>.....................{ tariffs?.water_tariff }
                           </p>
                           <p>
                              <strong>. Tarifa de gás:</strong>.........................{ tariffs?.gas_tariff }
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className={ styles.registers_data }>
                     <h1 className={ styles.monthCons_title }>
                        Meses de consumo registrados
                     </h1>

                     <div className={ `${styles.months_container} ${styles.datas_container}` }>
                        <div>
                           { monthConsList && monthConsList.map(data => (
                              <p key={ data.id }>
                                 <strong>. { months[data.month] }/</strong>{ data.year }
                              </p>
                           )) }
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Homepage;