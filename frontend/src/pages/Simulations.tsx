
// import css
import styles from '@styles/pages/BaseDatas.module.css';

// import images
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
   SimulationResponseDTO
} from '@DTOs/Simulations.dtos';

// import hooks
import { useState, useEffect } from 'react';

// import services
import { simulationsService } from '@services/Simulations.service';

// utils
type ButtonType = 'energy' | 'water' | 'gas' | null;


// simulations
const Simulations = () => {
   //// variables
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const [ isSimulation, setIsSimulation ] = useState<boolean>(false);
   const [ changeSimulation, setChangeSimulation ] = useState<boolean>(false);
   const [ simulationsList, setSimulationsList ] = useState<SimulationResponseDTO[]>([]);
   const [ currentIndex, setCurrentIndex ] = useState<number>(0);
   const currentSimulation = simulationsList[currentIndex] ?? null;
   const [ /*simulationID*/, setSimulationID ] = useState<string>('');
   const [ /*reductionPercent*/, setReductionPercent ] = useState<number>(0);
   const [ /*targetType*/, setTargetType ] = useState<string>('');
   const [selectedButton, setSelectedButton] = useState<ButtonType>(null);


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

   // check simulations - get
   useEffect(() => {
      const getSimulations = async () => {
         try{
            const response = await simulationsService.getSimulationService();
            if(!response) console.error('⚠️ Unexpected return from API:', response);
            if(response.length === 0){
               setIsSimulation(false);
               setChangeSimulation(true);
               return;
            }
            
            // set simulations
            setSimulationsList(response);

            // is simulations
            setIsSimulation(true);
         }
         catch(error){
            console.error('❌ Error at check simulations: ', error);
            
            setIsSimulation(false);
            setChangeSimulation(true);
         }
      };
      getSimulations();
   });


   // create simulation
   const createSimulation = () => {

   };

   // prev month
   const goPrev = () => {
      if (currentIndex > 0) {
         setCurrentIndex(prev => prev - 1);
      }
   };

   // next month
   const goNext = () => {
      if (currentIndex < simulationsList.length - 1) {
         setCurrentIndex(prev => prev + 1);
      }
   };

   // delete simulation confirmation
   const deleteConfirm = (id: string) => {
      setSimulationID(id);

      modal_config({
         title: 'Espere ❕', 
         msg: `Tem certeza que deseja \n deletar a simulação ?`, 
         btt1: 'Tenho certeza', btt2: 'Voltar', display: true
      });
   };

   // delete simulation
   const deleteSimulation = async () => {

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
            modalEvent={ deleteSimulation }
         />   

         {/* navbar */}
         <Navbar />

         <div className='homepage'>
            {/* sidebar */}
            <Sidebar />
            
            {
               changeSimulation ? (
                  <div className={ styles.data_container }>
                     <div className={ styles.data_register_container }>
                        <form
                           method="post"
                           onSubmit={ createSimulation }
                        >
                           <h1>Registre a simulação</h1>
                        
                           <input
                              type="number" name="reduction_percent"
                              placeholder='Porcentagem de redução (ex: 10%)'
                              autoComplete='off'
                              min="1" max="100"
                              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setReductionPercent(Number(e.target.value)) }
                           />
                           <select 
                              title='target_type'
                              name='target_type'
                              onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setTargetType(e.target.value) }
                           >
                              <option value="">Selecione um tipo de conta</option>
                              <option value="energy">Energia</option>
                              <option value="water">Água</option>
                              <option value="gas">Gás</option>
                              <option value="all">Todos</option>
                           </select>
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

                     { isSimulation && (
                        <div 
                           className={ styles.goBack }
                           onClick={ () => setChangeSimulation(false) }
                        >
                           <img src={ goback_img } alt="goback_img" />
                           <h2>Voltar</h2>                        
                        </div>
                     ) }
                  </div>
               ) : (
                  <div className={ styles.data_container }>
                     <div className={ styles.btts_container_2 }>
                        <button
                           type='button'
                           onClick={ () => setChangeSimulation(true) }
                           className={ styles.create_btt }
                        >
                           CRIAR SIMULAÇÃO
                        </button>

                        <div className={ styles.buttons }>
                           <button 
                              type='button'
                              onClick={() => setSelectedButton(selectedButton === 'energy' ? null : 'energy')} 
                              className={selectedButton === 'energy' ? styles.btt_clicked : ''}
                           >
                              ENERGIA
                           </button>
                           <button 
                              type='button'
                              onClick={() => setSelectedButton(selectedButton === 'water' ? null : 'water')} 
                              className={selectedButton === 'water' ? styles.btt_clicked : ''}
                           >
                              ÁGUA
                           </button>
                           <button 
                              type='button'
                              onClick={() => setSelectedButton(selectedButton === 'gas' ? null : 'gas')} 
                              className={selectedButton === 'gas' ? styles.btt_clicked : ''}
                           >
                              GÁS
                           </button>
                        </div>
                     </div>

                     <div className={ styles.data }>
                        <div className={ styles.data_navigate }>
                           <img 
                              src={ leftArrow_img } 
                              alt="left_arrow"
                              onClick={ goPrev } 
                           />
                           
                           <h1>
                              Simulação sobre { currentSimulation?.reduction_percent }% de redução no consumo de { currentSimulation?.target_type }
                           </h1>
                           
                           <img 
                              src={ rightArrow_img } 
                              alt="right_arrow" 
                              onClick={ goNext }
                           />
                        </div>

                        <div className={ styles.data_registers_2 }>
                           <div className="chart-wrapper">
                              <div
                                 className="donut"
                                 style={{
                                    background: `conic-gradient(
                                    #f04c6c 0% ${ currentSimulation?.reduction_percent }%,
                                    #6ee7a8 ${ currentSimulation?.reduction_percent }% 100%
                                    )`
                                 }}
                              >
                                 <div className="donut-hole">
                                    <span>{ currentSimulation?.reduction_percent }%</span>
                                 </div>
                              </div>

                              <div className="legend">
                                 <div>
                                    <span className="color red" /> 
                                    Redução de: { currentSimulation?.reduction_percent }%
                                 </div>
                                 <div>
                                    <span className="color green" /> 
                                    Economia anual: R${ currentSimulation?.annual_saving.toFixed(2) }
                                 </div>
                                 <div>
                                    <span className="color black" />
                                    Economia mensal: R${ currentSimulation?.monthly_saving.toFixed(2) }
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div 
                           className={ styles.data_delete } 
                           onClick={ () => deleteConfirm(currentSimulation?.id) }
                        >
                           <img src={ delete_img } alt="delete_img" />
                        </div>
                     </div>
                  </div>
               )
            }
         </div>
      </div>   
   );
};

export default Simulations;