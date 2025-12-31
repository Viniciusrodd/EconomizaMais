
// import css
import styles from '@styles/pages/Signin.module.css';

// import images
import desc_img from '@images/signin/desc_img.jpg';
import welcome_img from '@images/signin/signin.png';

// import hooks
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// import interfaces
import type { iModalConfig } from '@interfeces/Modal.interface';

// import components
import Modal from '@components/Modal';



// sign in
const SignIn = () => {
   //// variables
   const navigate = useNavigate();
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const [ name, setName ] = useState<string>('');
   const [ residence_name, setResidence_name ] = useState<string>('');
   const [ number_of_residents, setNumber_of_residents ] = useState<string>('');
   const [ redirect, setRedirect ] = useState<boolean>(false);


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

   // redirect
   useEffect(() =>{
      if(redirect){
         const clearMessage = setTimeout(() =>{
            modal_config({
               title: '', msg: '', btt1: false, 
               btt2: false, display: false
            });

            navigate('/');            
         }, 6000);

         return () =>{
            clearTimeout(clearMessage);
         };
      }
   }, [redirect, navigate]);

   // sign in request
   const handleForm = async () => {
      try{
         /*
         const response = await userService.signIn(name, residence_name, number_of_residents);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
         }
         */

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Registro feito com sucesso \n você será redirecionado...`, 
            btt1: false, btt2: false, display: true
         });

         setRedirect(true);
      }
      catch(error){
         console.error('❌ Error at sign in', error);
         modal_config({
            title: 'Erro ❗️', 
            msg: `${error} ❌`, 
            btt1: false, btt2: 'Voltar', display: true
         });
      }
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
                  Nosso objetivo é ajudar você a <strong>transformar pequenas mudanças em grandes resultados</strong>: menos desperdício,
                  mais economia e um impacto positivo no meio ambiente.
               </p>
               <p>
                  <strong>Registre-se agora e comece sua jornada rumo a um consumo mais consciente!</strong>
               </p>
            </div>
         </div>
      
         <form onSubmit={ handleForm } className={ styles.data }>
            <img src={ welcome_img } alt="welcome_img" />

            <h1>Bem vindo/a</h1>

            <input 
               type="text" name="name" 
               className={ styles.input_text } placeholder='Nome'
               autoComplete='off' value={ name } 
               onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value) }
               required 
            />
            <input 
               type="text" name="residence_name" 
               className={ styles.input_text } placeholder='Nome de residência'
               autoComplete='off' value={ residence_name } 
               onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setResidence_name(e.target.value) } 
               required
            />
            <input 
               type="number" name="number_of_residents" 
               className={ styles.input_text } placeholder='Número de residentes'
               autoComplete='off' value={number_of_residents} 
               onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setNumber_of_residents(e.target.value) } 
               required
            />

            <button type='submit'>
               CADASTRAR
            </button>
         </form>
      </div>
   );
};


export default SignIn;