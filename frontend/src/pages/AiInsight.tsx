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

// import interfaces
import type { iModalConfig } from '@interfeces/frontend/Modal.interface';
import type { 
   AIInsightResponseDTO,
   Consume_type,
   Insight_category 
} from '@DTOs/aiInsights.dtos';

// import hooks
import { useState, useEffect, useContext } from 'react';

// import services
import { aiInsightsService } from '@services/AiInsights.service';

// import context
import { LoadingContext } from '@contexts/Loading/Loading.context';


// utils
type ButtonType = 'tips' | 'patterns' | 'anomalies' | null;



// ai insight
const AiInsight = () => {
   //// variables
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const [ changeInsight, setChangeInsight ] = useState<boolean>(false);
   const [ isInsight, setIsInsight ] = useState<boolean>(false);
   const [ insightList, setInsightList ] = useState<AIInsightResponseDTO[]>([]);
   const [ currentIndex, setCurrentIndex ] = useState<number>(0);
   const currentInsight = insightList[currentIndex] ?? null;
   const [ insightID, setInsightID ] = useState<string>('');
   const [ selectedButton, setSelectedButton ] = useState<ButtonType>('anomalies');
   const [ hasAnyInsight, setHasAnyInsight ] = useState<boolean>(false);
   const [ consume_type, setConsume_type ] = useState<Consume_type | ''>('');
   const [ insight_category, setInsight_category ] = useState<Insight_category | ''>('');


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

   // fetch insights - get
   const fetchInsights = async () => {
      setLoading(true);

      const response = await aiInsightsService.getAiInsightsService();

      // if exist any insight - global
      const hasAny = !!response && response.length > 0;
      setHasAnyInsight(hasAny);

      // if there's no insights
      if(!hasAny){
         setInsightList([]);
         setCurrentIndex(0);
         setIsInsight(false);
         setChangeInsight(true);
         setLoading(false);
         return;
      }

      // if exist some insight
      setIsInsight(true);
      setChangeInsight(false);
      setLoading(false);

      // filter insight
      const filtered = selectedButton ? response.filter(s => s.insight_category === selectedButton) : response;
      if(!filtered || filtered.length === 0){
         setInsightList([]);
         setCurrentIndex(0);
         return;
      }
      
      setInsightList(filtered);
      setCurrentIndex(0);
      setIsInsight(true);
      setChangeInsight(false);
   };

   // filter insights
   useEffect(() => {
      const filterInsights = async () => {
         await fetchInsights();
      };
      filterInsights();
      setCurrentIndex(0);
   }, [selectedButton]);

   // check insights - get
   useEffect(() => {
      const getInsights = async () => {
         try{
            await fetchInsights();
         }
         catch(error){
            console.error('❌ Error at check insights: ', error);
            
            setIsInsight(false);
            setChangeInsight(true);
         }
      };
      getInsights();
   }, []);

   // create insight
   const createInsight = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      if(!consume_type || !insight_category){
         setLoading(false);
         modal_config({
         title: 'Erro ❌',
         msg: 'Selecione o tipo de conta e a categoria',
         btt1: false, btt2: 'Tentar novamente', display: true
      });
         return;
      }

      // insight data setup
      const data = {
         consume_type,
         insight_category
      };

      try{
         const response = await aiInsightsService.createAiInsightsService(data);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
         }
         
         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Insight registrado com sucesso`, 
            btt1: false, btt2: false, display: true
         });

         // refresh insights
         await fetchInsights();

         setTimeout(() => {
            closeModal();
            setChangeInsight(false);
            setLoading(false);
         }, 4000);
      }
      catch(error){
         console.error('❌ Error at create insight: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: `${ error }`, 
            btt1: false, btt2: 'Tentar novamente', display: true
         });

         setLoading(false);
      }
   };

   // prev insight
   const goPrev = () => {
      if(currentIndex > 0) setCurrentIndex(prev => prev - 1);
   };

   // next insight
   const goNext = () => {
      if(currentIndex < insightList.length - 1) setCurrentIndex(prev => prev + 1);
   };

   // delete insight confirmation
   const deleteConfirm = (id: string) => {
      setInsightID(id);

      modal_config({
         title: 'Espere ❕', 
         msg: `Tem certeza que deseja \n deletar o insight ?`, 
         btt1: 'Tenho certeza', btt2: 'Voltar', display: true
      });
   };

   // delete insight
   const deleteInsight = async () => {
      setLoading(true);

      try{
         await aiInsightsService.deleteAiInsightService(insightID);

         // refresh data
         await fetchInsights();

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Insight deletado com sucesso`, 
            btt1: false, btt2: false, display: true
         });

         setTimeout(async () => {
            closeModal();
            setLoading(false);
         }, 4000);
      }
      catch(error){
         console.error('❌ Error at delete insights: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: `${ error }`, 
            btt1: false, btt2: 'Tentar novamente', display: true
         });

         setLoading(false);
      }
   };

   // category check
   const categoryCheck = () => {
      return selectedButton == 'anomalies' ? 'Anomalias' 
      : selectedButton == 'patterns' ? 'Padrões' 
      : selectedButton == 'tips' ? 'Dicas' 
      : ''
   };

   // consume check
   const consumeCheck = () => {
      return currentInsight?.consume_type == 'energy' ? 'Energia' 
      : currentInsight?.consume_type == 'water' ? 'Água' 
      : currentInsight?.consume_type == 'gas' ? 'Gás' 
      : ''
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
            modalEvent={ deleteInsight }
         />            
         
         {/* navbar */}
         <Navbar />

         <div className='homepage'>
            {/* sidebar */}
            <Sidebar />
            
            { changeInsight || !hasAnyInsight ? (
               <div className={ styles.data_container }>
                  <div className={ styles.data_register_container }>
                     <form
                        method="post"
                        onSubmit={ createInsight }
                     >
                        <h1>Crie um insight</h1>
                     
                        <select 
                           title='consume_type'
                           name='consume_type'
                           onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setConsume_type(e.target.value as Consume_type) }
                        >
                           <option value="">Selecione um tipo de conta</option>
                           <option value="energy">Energia</option>
                           <option value="water">Água</option>
                           <option value="gas">Gás</option>
                        </select>

                        <select 
                           title='insight_category'
                           name='insight_category'
                           onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setInsight_category(e.target.value as Insight_category) }
                        >
                           <option value="">Selecione uma categoria</option>
                           <option value="anomalies">Anomalias</option>
                           <option value="patterns">Padrões</option>
                           <option value="tips">Dicas</option>
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

                     <div className={ styles.instructions }>
                        <h1>Regra para criar um insight: </h1>
                        
                        <ul>
                           <li>. Escolha o tipo de conta: (Energia, Água ou Gás)</li>
                           <li>. Escolha uma categoria: (Anomalia, Dica ou Padrão)</li>
                           <li>. Não é permitido repetir combinações já existentes (ex: Anomalia de Energia)</li>
                        </ul>
                     </div>
                  </div>

                  { isInsight && (
                     <div 
                        className={ styles.goBack }
                        onClick={ () => setChangeInsight(false) }
                     >
                        <img src={ goback_img } alt="goback_img" />
                        <h2>Voltar</h2>                        
                     </div>
                  ) }
               </div>
            ) : (
               <div className={ styles.data_container }>
                  <div className={ `${styles.btts_container_3} ${styles.btts_container_2}` }>
                     <button
                        type='button'
                        onClick={ () => setChangeInsight(true) }
                        className={ styles.create_btt }
                     >
                        CRIAR INSIGHT
                     </button>

                     <div className={ styles.buttons }>
                        <button 
                           type='button'
                           onClick={() => setSelectedButton(selectedButton === 'anomalies' ? null : 'anomalies')} 
                           className={selectedButton === 'anomalies' ? styles.btt_clicked : ''}
                        >
                           ANOMALIAS
                        </button>
                        <button 
                           type='button'
                           onClick={() => setSelectedButton(selectedButton === 'patterns' ? null : 'patterns')} 
                           className={selectedButton === 'patterns' ? styles.btt_clicked : ''}
                        >
                           PADRÕES
                        </button>
                        <button 
                           type='button'
                           onClick={() => setSelectedButton(selectedButton === 'tips' ? null : 'tips')} 
                           className={selectedButton === 'tips' ? styles.btt_clicked : ''}
                        >
                           DICAS
                        </button>
                     </div>
                  </div>

                  <div className={ styles.data }>
                     <div className={ styles.data_navigate }>
                        { insightList.length > 1 && (
                           <span className="tooltip tooltip_btt" data-tooltip="Anterior" onClick={ goPrev }>
                              <img
                                 src={ leftArrow_img }
                                 alt="left_arrow"
                              />
                           </span>
                        ) }
                        
                        { consumeCheck() == '' ? (
                           <h1>Sem "{ categoryCheck() }" no momento...</h1>
                        ) : (
                           <h1>
                              { categoryCheck() } no consumo de { consumeCheck() }
                           </h1>
                        ) }
                        
                        { insightList.length > 1 && (
                           <span className="tooltip tooltip_btt" data-tooltip="Próximo" onClick={ goNext }>
                              <img
                                 src={ rightArrow_img }
                                 alt="right_arrow"
                              />
                           </span>
                        ) }
                     </div>

                     <div className={ `${styles.desc_2} ${styles.desc}` }>
                        <p>{ (currentInsight?.ai_response ?? 'Crie um insight acima ⬆️') }</p>
                     </div>

                     { insightList.length > 0 && (
                        <div 
                           className={ `${styles.data_delete} tooltip tooltip_btt` }
                           data-tooltip="Deletar"
                           onClick={ () => deleteConfirm(currentInsight?.id) }
                        >
                           <img src={ delete_img } alt="delete_img" />
                        </div>
                     ) }
                  </div>

                  <p className='advice'>
                     *As recomendações da IA são estimativas educativas, não substituem orientação técnica.
                  </p>                  
               </div>
            ) }
         </div>
      </div>
   );
};

export default AiInsight;