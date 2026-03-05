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
import { userService } from '@services/User.service';

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
   const [ redirect, setRedirect ] = useState<boolean>(false);


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

   // redirect
   useEffect(() =>{
      if(redirect){
         const clearMessage = setTimeout(() =>{
            modal_config({
               title: '', msg: '', btt1: false, 
               btt2: false, display: false
            });

            navigate('/registro');       
         }, 4000);

         return () =>{
            clearTimeout(clearMessage);
         };
      }
   }, [redirect, navigate]);

   // fetch user
   const fetchUser = async () => {
      const response = await userService.getUser();
      if(!response) throw new Error('❌ Usuário não encontrado');
   };

   // fetch tariffs
   const fetchTariffs = async () => {
      const response = await tariffService.getTariffService();
      if(!response) throw new Error('❌ Erro ao achar as tarifas');

      // set tariffs
      setTariffs(response);
   };

   // fetch monthly consumptions
   const fetchMonthCons = async () => {
      const response = await monthlyConsumptionService.getMonthConsService();
      if(!response) throw new Error('❌ Erro ao achar os meses de consumo');

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
      if(!energy_response) throw new Error('❌ Erro ao achar o resumo de consumos de energia');
      setEnergySummary(energy_response);

      // water
      const water_response = await monthlyConsumptionService.getMonthConsSummaryService('water_m3');
      if(!water_response) throw new Error('❌ Erro ao achar o resumo de consumos de água');
      setWaterSummary(water_response);

      // gas
      const gas_response = await monthlyConsumptionService.getMonthConsSummaryService('gas_m3');
      if(!gas_response) throw new Error('❌ Erro ao achar o resumo de consumos de gás');
      setGasSummary(gas_response);
   };

   // fetch safes
   const fetchUserSafe = async () => {
      try{
         await fetchUser();
         return { ok: true };
      }catch(error){
         return { ok: false, error };
      }
   };
   const fetchTariffsSafe = async () => {
      try{
         await fetchTariffs();
         return { ok: true };
      }catch(error){
         return { ok: false, error };
      }
   };
   const fetchMonthConsSafe = async () => {
      try{
         await fetchMonthCons();
         return { ok: true };
      }catch(error){
         return { ok: false, error };
      }
   };
   const fetchMonthConsSummarySafe = async () => {
      try{
         await fetchMonthConsSummary();
         return { ok: true };
      }catch(error){
         return { ok: false, error };
      }
   };

   // check datas
   useEffect(() => {
      const loadData = async () => {
         setLoading(true);

         // user
         const user = await fetchUserSafe();
         if(!user.ok){
            console.error('❌ Error at check user: ', user.error);
            setLoading(false);
            
            modal_config({
               title: 'Erro ❌', 
               msg: `${ user.error }, \n você será redirecionado...`, 
               btt1: false, btt2: false, display: true
            });

            setRedirect(true);
            return;
         }

         // tariffs
         const tariffs = await fetchTariffsSafe();
         if(!tariffs.ok){
            console.error('❌ Error at check tariffs: ', tariffs.error);
            setLoading(false);

            setModal_event('tariffs_notfound'); // call btt1 event

            modal_config({
               title: 'Espere ❕', 
               msg: `${ tariffs.error }, \n Registre agora suas Tarifas de consumo`, 
               btt1: 'Registrar', btt2: false, display: true
            });

            return;
         }

         // month cons
         const monthCons = await fetchMonthConsSafe();
         if(!monthCons.ok){
            console.error('❌ Error at check monthly consumptions: ', monthCons.error);
            setLoading(false);

            modal_config({
               title: 'Erro ❌', 
               msg: `${ monthCons.error }`, 
               btt1: false, btt2: 'Tentar novamente', display: true
            });

            return;
         }

         // month cons summary
         const monthConsSummary = await fetchMonthConsSummarySafe();
         if(!monthConsSummary.ok){
            console.error('❌ Error at check monthly consumptions summary: ', monthConsSummary.error);
            setLoading(false);

            modal_config({
               title: 'Erro ❌', 
               msg: `${ monthConsSummary.error }`, 
               btt1: false, btt2: 'Tentar novamente', display: true
            });

            return;
         }
      };

      loadData();
      setLoading(false);
   }, []);

   // prev month cons
   const goPrev = () => {
      setCurrentIndex(prev => Math.max(0, prev - 1));
   };

   // next month cons
   const goNext = () => {
      setCurrentIndex(prev => Math.min(2, prev + 1));
   };

   // get summary
   const getSummary = () => {
      if(currentIndex === 0) return energySummary;
      if(currentIndex === 1) return waterSummary;
      if(currentIndex === 2) return gasSummary;
      return undefined;
   };

   // average - visual percent
   const visualPercent = () => {
      const average = getSummary()?.average_consume ?? 0;
   
      if(average === 0) return 0;
      else if(average < 50) return 25;
      else if(average < 150) return 50;
      else if(average < 300) return 75;
      else return 100;
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
                  <div className={ `${styles.data_navigate_2} ${styles.data_navigate}` }>
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
                           summary={{ 
                              average: getSummary()?.average_consume, 
                              visualPercent: visualPercent() 
                           }}
                        />

                        <div className="legend">
                           <div>
                              <span className="color reduction" /> 
                              Média de consumo: { getSummary()?.average_consume }
                              <small>(nível visual aproximado)</small>
                           </div>
                           <div>
                              <span className="color annual" /> 
                              Variação do mês passado: { getSummary()?.variation_last_month }
                           </div>
                           <div>
                              <span className="color month" /> 
                              Mês de consumo mais alto: { getSummary()?.highest_consume_month }
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
                              <strong>. Tarifa de energia:</strong>...............{ tariffs?.energy_tariff.toFixed(2) }Kwh
                           </p>
                           <p>
                              <strong>. Tarifa de água:</strong>.....................{ tariffs?.water_tariff.toFixed(2) }m3
                           </p>
                           <p>
                              <strong>. Tarifa de gás:</strong>........................{ tariffs?.gas_tariff.toFixed(2) }m3
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