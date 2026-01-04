
// import css
import styles from '@styles/pages/BaseDatas.module.css';

// import images
import navigation_img from '@images/utils/navigator.png';
import leftArrow_img from '@images/utils/left_arrow.png';
import rightArrow_img from '@images/utils/right_arrow.png';

// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import Modal from '@components/Modal';

// import interfaces
import type { iModalConfig } from '@interfeces/frontend/Modal.interface';
import type { MonthlyConsumptionResponseDTO } from '@DTOs/monthlyConsumption.dtos';

// import hooks
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import services
import { monthlyConsumptionService } from '@services/MonthlyConsumption.service';


// monthly consumption
const MonthlyConsumption = () => {
   //// variables
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const [ isMonthCons, setIsMonthCons ] = useState<boolean>(false);
   const [ changeMonthCons, setChangeMonthCons ] = useState<boolean>(false);
   const [ monthConsList, setMonthConsList ] = useState<MonthlyConsumptionResponseDTO[]>([]);
   const [ currentIndex, setCurrentIndex ] = useState<number>(0);
   const currentMonthCons = monthConsList[currentIndex] ?? null;


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

   // check month cons
   useEffect(() => {
      const getMonthCons = async () => {
         try{
            const response = await monthlyConsumptionService.getMonthConsService();
            if(!response) console.error('⚠️ Unexpected return from API:', response);
            if(response.length === 0){
               setIsMonthCons(false);
               return;
            }

            // set month cons
            setMonthConsList(response);
            setCurrentIndex(response.length - 1); // begins in most recently month  
         
            // is month cons
            setIsMonthCons(true);
         }
         catch(error){
            console.error('❌ Error at check month cons: ', error);
            
            setIsMonthCons(false);
            setChangeMonthCons(true);
         }
      };
      getMonthCons();
   }, []);

   // prev month
   const goPrev = () => {
      if (currentIndex > 0) {
         setCurrentIndex(prev => prev - 1);
      }
   };

   // next month
   const goNext = () => {
      if (currentIndex < monthConsList.length - 1) {
         setCurrentIndex(prev => prev + 1);
      }
   };
   
   // create monthCons
   const createMonthCons = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      /* 
      // monthCons data setup
      const data = {

      }

      try{
         const response = await MonthlyConsumptionService.createMonthConsService(data);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
         }

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Mês de consumo registrado com sucesso \n você será redirecionado...`, 
            btt1: false, btt2: false, display: true
         });

         setTimeout(() => {
            closeModal();
            setChangeMonthCons(false);
         }, 4000);
      }
      catch(error){
         console.error('❌ Error at create monthly consumption: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: `${ error }`, 
            btt1: false, btt2: 'Tentar novamente', display: true
         });
      }
      */
   };

   // edit month cons
   const editMonthCons = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      /*
      // tariff data setup
      const data: UpdateMonthlyConsumptionDTO = {};

      try{
         const response = await monthlyConsumptionService.updateMonthConsService(data);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
         }

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Mês de consumo atualizado com sucesso \n você será redirecionado...`, 
            btt1: false, btt2: false, display: true
         });

         setTimeout(() => {
            closeModal();
            setChangeTariffs(false);
         }, 4000);
      }
      catch(error){
         console.error('❌ Error at update monthly consumption: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: 
               energy_tariff > 999 || 
               water_tariff > 999 || 
               gas_tariff > 999 ? `Valor de mês de consumo muito alto` : `${error}`, 
            btt1: false, btt2: 'Tentar novamente', display: true
         });
      }
      */
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
            
            {
               changeMonthCons ? (
                  <div className={ styles.data_container }>
                     <div className={ styles.data_register_container }>
                        <form
                           method="post"
                           onSubmit={ isMonthCons ? editMonthCons : createMonthCons }
                        >
                           <h1>Registre o mês de consumo</h1>
                        
                           <input
                              type="number" name="energy_kwh"
                              placeholder='Consumo de energia (ex: 250.50)'
                              autoComplete='off'
                              step="0.01" min="0"
                              required
                           />
                           <input
                              type="number" name="water_m3"
                              placeholder='Consumo de água (ex: 14.25)'
                              autoComplete='off'
                              step="0.01" min="0"
                              required
                           />
                           <input
                              type="number" name="gas_m3"
                              placeholder='Consumo de gás (ex: 8.75)'
                              autoComplete='off'
                              step="0.01" min="0"
                              required
                           />
                           <button type='submit'>
                              ENVIAR
                           </button>
                        </form>

                        <div className={ styles.instructions }>
                           <h1>Formas de encontrar consumo elétrico(exemplo): </h1>
                           
                           <ul>
                              <li>. Conta de Luz (Fatura)</li>
                              <li>. Consumo de um Aparelho Específico</li>
                              <li>. Usando Ferramentas e Dispositivos</li>
                              <li>. Identificando Fugas de Energia</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className={ styles.data_container }>
                     <button type='button' onClick={ () => setChangeMonthCons(true) }>
                        EDITAR CONSUMO
                     </button>

                     <div className={ styles.data }>
                        <div className={ styles.data_navigate }>
                           <img 
                              src={ leftArrow_img } 
                              alt="left_arrow"
                              onClick={ goPrev } 
                           />
                           <h1>
                              Mês de consumo - { currentMonthCons?.month }/{ currentMonthCons?.year }
                           </h1>
                           <img 
                              src={ rightArrow_img } 
                              alt="right_arrow" 
                              onClick={ goNext }
                           />
                        </div>

                        <div className={ styles.data_registers }>
                           <div className={ `${styles.cards} ${styles.energy}` }>
                              <h1>Consumo de Energia</h1>

                              <h2>{ currentMonthCons?.energy_kwh } Kwh</h2>
                           </div>
                           <div className={ `${styles.cards} ${styles.water}` }>
                              <h1>Consumo de Água</h1>

                              <h2>{ currentMonthCons?.water_m3 } m3</h2>                     
                           </div>
                           <div className={ `${styles.cards} ${styles.gas}` }>
                              <h1>Consumo de Gás</h1>

                              <h2>{ currentMonthCons?.gas_m3 } m3</h2>
                           </div>
                        </div>
                     </div>

                     <div className={ styles.info }>
                        <Link to='/'>                  
                           <h2>Conferir estatísticas de meses de consumo</h2>
                        </Link>
                        <img src={ navigation_img } alt="navigation_img" />
                     </div>
                  </div>
               )
            }            
         </div>
      </div>
   );
};

export default MonthlyConsumption;