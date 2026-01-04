
// import css
import styles from '@styles/pages/BaseDatas.module.css';

// import images
import navigation_img from '@images/utils/navigator.png';
import leftArrow_img from '@images/utils/left_arrow.png';
import rightArrow_img from '@images/utils/right_arrow.png';
import goback_img from '@images/utils/back.png';
import delete_img from '@images/utils/delete.png';

// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import Modal from '@components/Modal';

// import interfaces
import type { iModalConfig } from '@interfeces/frontend/Modal.interface';
import type { 
   MonthlyConsumptionResponseDTO, 
   UpdateMonthlyConsumptionDTO
} from '@DTOs/monthlyConsumption.dtos';

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
   const [ isEditMonthCons, setIsEditMonthCons ] = useState<boolean>(false);
   const [ changeMonthCons, setChangeMonthCons ] = useState<boolean>(false);
   const [ monthConsList, setMonthConsList ] = useState<MonthlyConsumptionResponseDTO[]>([]);
   const [ currentIndex, setCurrentIndex ] = useState<number>(0);
   const currentMonthCons = monthConsList[currentIndex] ?? null;
   const [ energy_kwh, setEnergy_kwh ] = useState<number>(0);
   const [ water_m3, setWater_m3 ] = useState<number>(0);
   const [ gas_m3, setGas_m3 ] = useState<number>(0);
   const [ month, setMonth ] = useState<number>(0);
   const [ year, setYear ] = useState<number>(0);
   const [ monthConsID, setMonthConsID ] = useState<string>('');   


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

   // fetch month cons
   const fetchMonthCons = async () => {
      const response = await monthlyConsumptionService.getMonthConsService();
      if(!response) console.error('⚠️ Unexpected return from API:', response);
      if(response.length === 0){
         setIsMonthCons(false);
         setChangeMonthCons(true);
         return;
      }

      // sort datas
      const sortedResponse = [...response].sort((a, b) => {
         const dateA = new Date(a.year, a.month - 1).getTime();
         const dateB = new Date(b.year, b.month - 1).getTime();
         return dateA - dateB; // (older → latest)
      });

      // set month cons
      setMonthConsList(sortedResponse);

      // is month cons
      setIsMonthCons(true);
   };

   // check month cons
   useEffect(() => {
      const getMonthCons = async () => {
         try{
            await fetchMonthCons()
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
      
      // monthCons data setup
      const data = {
         year, month, energy_kwh,
         water_m3, gas_m3
      };

      try{
         const response = await monthlyConsumptionService.createMonthConsService(data);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
         }

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Mês de consumo registrado com sucesso \n você será redirecionado...`, 
            btt1: false, btt2: false, display: true
         });

         // refresh month cons
         await fetchMonthCons();

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
   };

   // edit month cons
   const editMonthCons = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // monthCons data setup
      const data: UpdateMonthlyConsumptionDTO = {};
      if(energy_kwh !== 0) { data.energy_kwh = energy_kwh } 
      if(water_m3 !== 0) { data.water_m3 = water_m3 } 
      if(gas_m3 !== 0) { data.gas_m3 = gas_m3 } 

      try{
         const response = await monthlyConsumptionService.updateMonthConsService(monthConsID, data);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
         }

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Mês de consumo atualizado com sucesso \n você será redirecionado...`, 
            btt1: false, btt2: false, display: true
         });

         // refresh month cons
         await fetchMonthCons();

         setTimeout(() => {
            closeModal();
            setChangeMonthCons(false);
         }, 4000);
      }
      catch(error){
         console.error('❌ Error at update monthly consumption: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: 
               energy_kwh > 999 || 
               water_m3 > 999 || 
               gas_m3 > 999 ? `Valor de mês de consumo muito alto` : `${error}`, 
            btt1: false, btt2: 'Tentar novamente', display: true
         });
      }
   };

   // delete month cons confirmation
   const deleteConfirm = (id: string) => {
      setMonthConsID(id);

      modal_config({
         title: 'Espere ❕', 
         msg: `Tem certeza que deseja \n deletar o mês de consumo ?`, 
         btt1: 'Tenho certeza', btt2: 'Voltar', display: true
      });
   };

   // delete month cons
   const deleteMonthCons = async () => {
      try{
         await monthlyConsumptionService.deleteMonthConsService(monthConsID);

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Mês de consumo deletado com sucesso`, 
            btt1: false, btt2: false, display: true
         });

         setTimeout(async () => {
            closeModal();

            // get month cons
            await fetchMonthCons();
            goPrev();         
         }, 4000);

      }
      catch(error){
         console.error('❌ Error at delete monthly consumption: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: `${ error }`, 
            btt1: false, btt2: 'Tentar novamente', display: true
         });
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
            modalEvent={ deleteMonthCons }
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
                           onSubmit={ isMonthCons && isEditMonthCons ? editMonthCons : createMonthCons }
                        >
                           <h1>Registre o mês de consumo</h1>
                        
                           <input
                              type="number" name="month"
                              placeholder='Mês de consumo (ex: 12)'
                              autoComplete='off'
                              min="1" max="12"
                              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setMonth(Number(e.target.value)) }
                           />
                           <input
                              type="number" name="year"
                              placeholder='Ano de consumo (ex: 2026)'
                              autoComplete='off'
                              min="2026" max="2026"
                              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setYear(Number(e.target.value)) }
                           />
                           <input
                              type="number" name="energy_kwh"
                              placeholder='Consumo de energia (ex: 250.50)'
                              autoComplete='off'
                              step="0.01" min="0"
                              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setEnergy_kwh(Number(e.target.value)) }
                           />
                           <input
                              type="number" name="water_m3"
                              placeholder='Consumo de água (ex: 14.25)'
                              autoComplete='off'
                              step="0.01" min="0"
                              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setWater_m3(Number(e.target.value)) }
                           />
                           <input
                              type="number" name="gas_m3"
                              placeholder='Consumo de gás (ex: 8.75)'
                              autoComplete='off'
                              step="0.01" min="0"
                              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setGas_m3(Number(e.target.value)) }
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

                     { isMonthCons && (
                        <div 
                           className={ styles.goBack }
                           onClick={ () => {
                              setChangeMonthCons(false);
                              setIsEditMonthCons(false);
                           } }
                        >
                           <img src={ goback_img } alt="goback_img" />
                           <h2>Voltar</h2>                        
                        </div>
                     ) }
                  </div>
               ) : (
                  <div className={ styles.data_container }>
                     <div className={ styles.btts_container }>
                        <button 
                           type='button' 
                           onClick={ () => setChangeMonthCons(true) }
                           className={ styles.create_btt }
                        >
                           CRIAR CONSUMO
                        </button>
                        <button 
                           type='button' 
                           onClick={ () => { 
                              setChangeMonthCons(true);
                              setIsEditMonthCons(true); 
                              setMonthConsID(currentMonthCons?.id); 
                           } }
                        >
                           EDITAR CONSUMO
                        </button>
                     </div>

                     <div className={ styles.data }>
                        <div className={ styles.data_navigate }>
                           <img 
                              src={ leftArrow_img } 
                              alt="left_arrow"
                              onClick={ goPrev } 
                           />
                           { currentMonthCons?.month < 10 ? (
                              <h1>
                                 Mês de consumo - 0{ currentMonthCons?.month }/{ currentMonthCons?.year }
                              </h1>
                           ) : (
                              <h1>
                                 Mês de consumo - { currentMonthCons?.month }/{ currentMonthCons?.year }
                              </h1>
                           ) }
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

                        <div 
                           className={ styles.data_delete } 
                           onClick={ () => deleteConfirm(currentMonthCons?.id) }
                        >
                           <img src={ delete_img } alt="delete_img" />
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