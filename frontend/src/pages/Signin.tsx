
// import css
import styles from '@styles/pages/Signin.module.css';

// import images
import desc_img from '@images/signin/desc_img.jpg';
import welcome_img from '@images/signin/signin.png';

// import hooks
import { useState } from 'react';

// import interfaces
import type { iModalConfig } from '@interfeces/Modal.interface';

// import components
import Modal from '@components/Modal';



// sign in
const SignIn = () => {
   //// variables
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);


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


   //// jsx   


   return (
      <div className={ styles.container }>
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt1={ modal_btt }
            btt2={ modal_btt_2 }
            display={ modal_display }
            onClose={ closeModal }
         />

         <div className={ styles.desc_img }>
            <img src={ desc_img } alt="money_img" />

            <div className={ styles.desc_background }>
               <h1>ECONOMIZA+</h1>
               <p>
                  Bem-vindo(a) ao <strong>Economiza+</strong>, sua nova ferramenta para <strong>consumo consciente</strong> e <strong>economia doméstica!</strong> <br />
                  Aqui, você pode registrar e acompanhar o consumo de energia, água e gás da sua casa de forma 
                  simples e visual. 
               </p>
               <p>
                  Você terá tudo o que precisa para entender seus hábitos e descobrir onde é possível economizar.
                  Nosso objetivo é ajudar você a <strong>transformar pequenas mudanças em grandes resultados</strong>: menos desperdício,
                  mais economia e um impacto positivo no meio ambiente.
               </p>
               <p>
                  Vamos juntos construir um <strong>futuro mais sustentável</strong>, começando pela nossa própria casa.
               </p>
               <p>
                  <strong>Registre-se agora e comece sua jornada rumo a um consumo mais consciente!</strong>
               </p>
            </div>
         </div>
      
         <div className={ styles.data }>
            <img src={ welcome_img } alt="welcome_img" />

            <h1>Bem vindo/a</h1>

            <input 
               type="text" name="name" 
               className={ styles.input_text } placeholder='Nome'
               autoComplete='off' />
            <input 
               type="text" name="residence_name" 
               className={ styles.input_text } placeholder='Nome de residência'
               autoComplete='off' />
            <input 
               type="number" name="number_of_residents" 
               className={ styles.input_text } placeholder='Número de residentes'
               autoComplete='off' />

            <button type='submit'>
               CADASTRAR
            </button>
         </div>
      </div>
   );
};


export default SignIn;