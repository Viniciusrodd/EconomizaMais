
// import css
import styles from '@styles/pages/BaseDatas.module.css';

// import images
import delete_img from '@images/utils/delete.png';
import loading_img from '@images/utils/loading.png';

// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import Modal from '@components/Modal';

// import interfaces
import type { iModalConfig } from '@interfeces/frontend/Modal.interface';
import type { UpdateUserDTO } from '@DTOs/User.dtos';

// import hooks
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// import services
import { userService } from '@services/User.service';

// import context
import { LoadingContext } from '@contexts/Loading/Loading.context';


// user data
const UserData = () => {
   //// variables
   const navigate = useNavigate();
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const [ name, setName ] = useState<string>('');
   const [ residence_name, setResidence_name ] = useState<string>('');
   const [ number_of_residents, setNumber_of_residents ] = useState<number>(0);


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

   // fetch user - get
   const fetchUser = async () => {
      const response = await userService.getUser();
      if(!response){
         console.error('⚠️ Unexpected return from API:', response);
         return;
      }

      setName(response.name);
      setResidence_name(response.residence_name);
      setNumber_of_residents(response.number_of_residents);
   };

   // get user
   useEffect(() => {
      const getUser = async () => {
         try{
            await fetchUser();
         }
         catch(error){
            console.error('❌ Error at get user: ', error);

            modal_config({
               title: 'Erro ❌', 
               msg: `${ error }`, 
               btt1: false, btt2: 'Tentar novamente', display: true
            });
         }
      };
      getUser();
   }, []);

   // edit user
   const editUser = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      const data: UpdateUserDTO = {};
      if(name) { data.name = name }
      if(residence_name) { data.residence_name = residence_name }
      if(number_of_residents) { data.number_of_residents = number_of_residents }

      try{
         const response = await userService.updateUser(data);
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
         }

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Usuário atualizado com sucesso`, 
            btt1: false, btt2: false, display: true
         });

         // refresh user data
         await fetchUser();

         setTimeout(() => {
            closeModal();
            setLoading(false);
         }, 4000);
      }
      catch(error){
         console.error('❌ Error at update user: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: `${error}`, 
            btt1: false, btt2: 'Tentar novamente', display: true
         });

         setLoading(false);
      }
   };

   // delete user confirmation
   const deleteConfirm = () => {
      modal_config({
         title: 'Espere ❕', 
         msg: `Tem certeza que deseja \n deletar o usuário ?`, 
         btt1: 'Tenho certeza', btt2: 'Voltar', display: true
      });
   };

   // delete user
   const deleteUser = async () => {
      try{
         setLoading(true);
         await userService.deleteUser();

         modal_config({
            title: 'Sucesso ✔️', 
            msg: `Usuário deletado com sucesso`, 
            btt1: false, btt2: false, display: true
         });

         setTimeout(async () => {
            closeModal();
            setLoading(false);
            navigate('/registro');
         }, 4000);
      }
      catch(error){
         console.error('❌ Error at delete monthly consumption: ', error);

         modal_config({
            title: 'Erro ❌', 
            msg: `${ error }`, 
            btt1: false, btt2: 'Tentar novamente', display: true
         });

         setLoading(false);
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
            modalEvent={ deleteUser }
         />                     
         
         {/* navbar */}
         <Navbar />

         <div className='homepage'>
            {/* sidebar */}
            <Sidebar />
            
            <div className={ styles.data_container }>
               <div className={ styles.data_register_container }>
                  <form
                     method="post"
                     onSubmit={ editUser }
                     className={ styles.form_without_instructions }
                  >
                     <h1>Dados do usuário</h1>
                  
                     <input 
                        type="text" name="name" 
                        placeholder={`Nome: ${ name }`}
                        autoComplete='off'
                        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value) }
                     />
                     <input 
                        type="text" name="residence_name"
                        placeholder={`Nome de residência: ${ residence_name }`} 
                        autoComplete='off' 
                        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setResidence_name(e.target.value) } 
                     />
                     <input 
                        type="number" name="number_of_residents" 
                        placeholder={`Número de residentes: ${ number_of_residents }`}                         
                        autoComplete='off'
                        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setNumber_of_residents(Number(e.target.value)) } 
                     />

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
                        <>
                           <button type='submit' className={ styles.btt_edit }>
                              EDITAR
                           </button>
                           <div 
                              className={ `${styles.data_delete} tooltip tooltip_btt` } 
                              data-tooltip="Deletar"
                              onClick={ deleteConfirm }
                           >
                              <img src={ delete_img } alt="delete_img" />
                           </div>
                        </>
                     ) }

                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserData;