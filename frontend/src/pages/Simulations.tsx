/* eslint-disable react-hooks/exhaustive-deps */

// import css
import styles from '@styles/pages/BaseDatas.module.css';

// import images
import leftArrow_img from '@images/utils/left_arrow.png';
import rightArrow_img from '@images/utils/right_arrow.png';
import goback_img from '@images/utils/back.png';
import delete_img from '@images/utils/delete.png';
import loading_img from '@images/utils/loading.png';

// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import Modal from '@components/Modal';
import DonutChart from '@components/DonutChart';

// import interfaces
import type { iModalConfig } from '@interfeces/frontend/Modal.interface';
import type { 
   SimulationResponseDTO,
   targetType
} from '@DTOs/Simulations.dtos';

// import hooks
import { useState, useEffect, useContext } from 'react';

// import services
import { simulationsService } from '@services/Simulations.service';

// import context
import { LoadingContext } from '@contexts/Loading/Loading.context';

// utils
type ButtonType = 'energy' | 'water' | 'gas' | 'all' | null;


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
   const [ simulationID, setSimulationID ] = useState<string>('');
   const [ target_type, setTargetType ] = useState<targetType>('all');
   const [ reduction_percent, setReductionPercent ] = useState<number>(0);
   const [ selectedButton, setSelectedButton ] = useState<ButtonType>('all');
   const [ hasAnySimulation, setHasAnySimulation ] = useState<boolean>(false);


   //// context
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

   // fetch simulations - get
   const fetchSimulations = async () => {
      const response = await simulationsService.getSimulationService();

      // if exist any simulation - global
      const hasAny = !!response && response.length > 0;
      setHasAnySimulation(hasAny);

      // if there's no simulations
      if(!hasAny){
         setSimulationsList([]);
         setCurrentIndex(0);
         setIsSimulation(false);
         setChangeSimulation(true);
         return;
      }

      // if exist some simulation
      setIsSimulation(true);
      setChangeSimulation(false);

      // filter simulation
      const filtered = selectedButton ? response.filter(s => s.target_type === selectedButton) : response;
      if(!filtered || filtered.length === 0){
         setSimulationsList([]);
         setCurrentIndex(0);
         return;
      }
      
      setSimulationsList(filtered);
      setCurrentIndex(0);
      setIsSimulation(true);
      setChangeSimulation(false);
   };

   // filter simulations
   useEffect(() => {
      const filterSimulations = async () => {
         await fetchSimulations();
      };
      filterSimulations();
      setCurrentIndex(0);
   }, [selectedButton]);

   // check simulations - get
   useEffect(() => {
      const getSimulations = async () => {
         try{
            await fetchSimulations();
         }
         catch(error){
            console.error('❌ Error at check simulations: ', error);
            
            setIsSimulation(false);
            setChangeSimulation(true);
         }
      };
      getSimulations();
   }, []);

   // create simulation
   const createSimulation = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      // simulations data setup
      const data = {
         target_type,
         reduction_percent
      };

      try{
         const response = await simulationsService.createSimulationService(data);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
         }
         
         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Simulação registrada com sucesso`, 
            btt1: false, btt2: false, display: true
         });

         // refresh simulations
         await fetchSimulations();

         setTimeout(() => {
            closeModal();
            setChangeSimulation(false);
            setLoading(false);
         }, 4000);
      }
      catch(error){
         console.error('❌ Error at create simulation: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: `${ error }`, 
            btt1: false, btt2: 'Tentar novamente', display: true
         });
      }
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
      try{
         await simulationsService.deleteSimulationService(simulationID);

         // refresh data
         await fetchSimulations();

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Simulação deletada com sucesso`, 
            btt1: false, btt2: false, display: true
         });

         setTimeout(async () => {
            closeModal();
         }, 4000);
      }
      catch(error){
         console.error('❌ Error at delete simulations: ', error);

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
            modalEvent={ deleteSimulation }
         />   

         {/* navbar */}
         <Navbar />

         <div className='homepage'>
            {/* sidebar */}
            <Sidebar />
            
            {
               changeSimulation || !hasAnySimulation ? (
                  <div className={ styles.data_container }>
                     <div className={ styles.data_register_container }>
                        <form
                           method="post"
                           onSubmit={ createSimulation }
                           className={ styles.form_without_instructions }
                        >
                           <h1>Crie uma simulação</h1>
                        
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
                              onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setTargetType(e.target.value as targetType) }
                           >
                              <option value="">Selecione um tipo de conta</option>
                              <option value="energy">Energia</option>
                              <option value="water">Água</option>
                              <option value="gas">Gás</option>
                              <option value="all">Todos</option>
                           </select>

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
                              <button type='submit'>
                                 ENVIAR
                              </button>
                           )}
                        </form>
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
                              onClick={() => setSelectedButton(selectedButton === 'all' ? null : 'all')} 
                              className={selectedButton === 'all' ? styles.btt_clicked : ''}
                           >
                              TODOS
                           </button>
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
                           { simulationsList.length > 1 && (
                              <span className="tooltip tooltip_btt" data-tooltip="Anterior" onClick={goPrev}>
                                 <img
                                    src={ leftArrow_img }
                                    alt="left_arrow"
                                 />
                              </span>
                           ) }
                           
                           <h1>
                              Simulação sobre { (currentSimulation?.reduction_percent ?? 0) }% 
                              de redução no consumo de { selectedButton == 'energy' ? 'energia' : selectedButton == 'water' ? 'água' : selectedButton == 'gas' ? 'gás' : selectedButton == 'all' ? 'todas as contas' : 'sem conta' }
                           </h1>
                           
                           { simulationsList.length > 1 && (
                              <span className="tooltip tooltip_btt" data-tooltip="Próximo" onClick={ goNext }>
                                 <img
                                    src={ rightArrow_img }
                                    alt="right_arrow"
                                 />
                              </span>
                           ) }
                        </div>

                        <div className={ styles.data_registers_2 }>
                           <div className="chart-wrapper">
                              <DonutChart 
                                 key={ currentSimulation?.id ?? 'no-simulation' }
                                 percent={ (currentSimulation?.reduction_percent ?? 0) }
                              />

                              <div className="legend">
                                 <div>
                                    <span className="color red" /> 
                                    Redução de: { (currentSimulation?.reduction_percent ?? 0) }%
                                 </div>
                                 <div>
                                    <span className="color black" /> 
                                    Economia anual: R${ (currentSimulation?.annual_saving ?? 0).toFixed(2) }
                                 </div>
                                 <div>
                                    <span className="color border" />
                                    Economia mensal: R${ (currentSimulation?.monthly_saving ?? 0).toFixed(2) }
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className={ styles.desc }>
                           <p>{ (currentSimulation?.feedback ?? '') }</p>
                        </div>

                        { simulationsList.length > 0 && (
                           <div 
                              className={ `${styles.data_delete} tooltip tooltip_btt` }
                              data-tooltip="Deletar"
                              onClick={ () => deleteConfirm(currentSimulation?.id) }
                           >
                              <img src={ delete_img } alt="delete_img" />
                           </div>
                        ) }
                     </div>
                  </div>
               )
            }
         </div>
      </div>   
   );
};

export default Simulations;