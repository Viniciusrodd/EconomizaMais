
// import css
import styles from '@styles/pages/BaseDatas.module.css';

// import images
import navigation_img from '@images/utils/navigator.png';
import goback_img from '@images/utils/back.png';

// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import Modal from '@components/Modal';

// import interfaces
import type { iModalConfig } from '@interfeces/frontend/Modal.interface';
import type { UpdateTariffDTO } from '@DTOs/Tariffs.dtos';

// import hooks
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import services
import { tariffService } from '@services/Tariffs.service';


// tariffs
const Tariffs = () => {
   //// variables
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const [ isTariffs, setIsTariffs ] = useState<boolean>(false);
   const [ changeTariffs, setChangeTariffs ] = useState<boolean>(false);
   const [ energy_tariff, setEnergy_tariff ] = useState<number>(0);
   const [ water_tariff, setWater_tariff ] = useState<number>(0);
   const [ gas_tariff, setGas_tariff ] = useState<number>(0);


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

   // check tariffs - get
   useEffect(() => {
      const getTariffs = async () => {
         try{
            const response = await tariffService.getTariffService();
            if(!response){
               console.error('⚠️ Unexpected return from API:', response);
            }

            // is tariffs
            setIsTariffs(true);

            // set tariffs
            setEnergy_tariff(response.energy_tariff);
            setWater_tariff(response.water_tariff);
            setGas_tariff(response.gas_tariff);
         }
         catch(error){
            console.error('❌ Error at check tariffs: ', error);
            
            setIsTariffs(false);
            setChangeTariffs(true);
         }
      };
      getTariffs();
   }, []);
   
   // create tariff
   const createTariff = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // tariff data setup
      const data = {
         energy_tariff,
         water_tariff,
         gas_tariff
      };

      try{
         const response = await tariffService.createTariffService(data);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
         }

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Tarifas registradas com sucesso \n você será redirecionado...`, 
            btt1: false, btt2: false, display: true
         });

         setTimeout(() => {
            closeModal();
            setChangeTariffs(false);
            setIsTariffs(true);
         }, 4000);
      }
      catch(error){
         console.error('❌ Error at create tariff: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: `${ error }`, 
            btt1: false, btt2: 'Tentar novamente', display: true
         });
      }
   };

   // edit tariff
   const editTariff = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // tariff data setup
      const data: UpdateTariffDTO = {};
      if(energy_tariff !== 0) { data.energy_tariff = energy_tariff }
      if(water_tariff !== 0) { data.water_tariff = water_tariff }
      if(gas_tariff !== 0) { data.gas_tariff = gas_tariff }

      try{
         const response = await tariffService.updateTariffService(data);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
         }

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Tarifa atualizada com sucesso \n você será redirecionado...`, 
            btt1: false, btt2: false, display: true
         });

         setTimeout(() => {
            closeModal();
            setChangeTariffs(false);
         }, 4000);
      }
      catch(error){
         console.error('❌ Error at update tariff: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: 
               energy_tariff > 999 || 
               water_tariff > 999 || 
               gas_tariff > 999 ? `Valor de tarifa muito alto` : `${error}`, 
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
         />   

         {/* navbar */}
         <Navbar />

         <div className='homepage'>
            {/* sidebar */}
            <Sidebar />

            {
               changeTariffs ? (
                  <div className={ styles.data_container }>
                     <div className={ styles.data_register_container }>
                        <form
                           method="post"
                           onSubmit={ isTariffs ? editTariff : createTariff }
                        >
                           <h1>Registre as tarifas</h1>
                        
                           <input
                              type="number" name="energy_tariff"
                              placeholder='Tarifa de energia (ex: 0.80)'
                              autoComplete='off'
                              step="0.01" min="0"
                              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setEnergy_tariff(Number(e.target.value)) }
                           />
                           <input
                              type="number" name="water_tariff"
                              placeholder='Tarifa de água (ex: 6.50)'
                              autoComplete='off'
                              step="0.01" min="0"
                              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setWater_tariff(Number(e.target.value)) }
                           />
                           <input
                              type="number" name="gas_tariff"
                              placeholder='Tarifa de gás (ex: 8.00)'
                              autoComplete='off'
                              step="0.01" min="0"
                              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setGas_tariff(Number(e.target.value)) }
                           />
                           <button type='submit'>
                              ENVIAR
                           </button>
                        </form>

                        <div className={ styles.instructions }>
                           <h1>Exemplo de cálculo de tarifa elétrica: </h1>
                           
                           <ul>
                              <li>. <ins>Consumo do mês</ins>: 150 Kwh</li>
                              <li>. <ins>Total da conta (sem juros)</ins>: R$120,00</li>
                              <li>120 ÷ 150 = R$ 0,80 por kWh</li>
                              <li>. <ins>Tarifa de energia</ins>: 0,80</li>
                           </ul>
                        </div>
                     </div>

                     { isTariffs && (
                        <div 
                           className={ styles.goBack }
                           onClick={ () => {
                              setChangeTariffs(false);
                           } }
                        >
                           <img src={ goback_img } alt="goback_img" />
                           <h2>Voltar</h2>                        
                        </div>
                     ) }
                  </div>
               ) : (
                  <div className={ styles.data_container }>
                     <button type='button' onClick={ () => setChangeTariffs(true) }>
                        EDITAR TARIFAS
                     </button>

                     <div className={ styles.data }>
                        <h1>Tarifas atuais</h1>

                        <div className={ styles.data_registers }>
                           <div className={ `${styles.cards} ${styles.energy}` }>
                              <h1>Tarifa de Energia</h1>

                              <h2>{ Number(energy_tariff).toFixed(2) } Kwh</h2>
                           </div>
                           <div className={ `${styles.cards} ${styles.water}` }>
                              <h1>Tarifa de Água</h1>

                              <h2>{ Number(water_tariff).toFixed(2) } m3</h2>                     
                           </div>
                           <div className={ `${styles.cards} ${styles.gas}` }>
                              <h1>Tarifa de Gás</h1>

                              <h2>{ Number(gas_tariff).toFixed(2) } m3</h2>
                           </div>
                        </div>
                     </div>

                     <div className={ styles.info }>
                        <Link to='/'>                  
                           <h2>Conferir estatísticas de tarifas</h2>
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

export default Tariffs;