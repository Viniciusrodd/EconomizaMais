
// import css
import styles from '@styles/pages/BaseDatas.module.css';

// import images
import delete_img from '@images/utils/delete.png';

// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import Modal from '@components/Modal';

// import interfaces
import type { iModalConfig } from '@interfeces/frontend/Modal.interface';

// import hooks
import { useState, /*useEffect, useContext*/ } from 'react';

// import services
//import { userService } from '@services/User.service';

// import context
//import { LoadingContext } from '@contexts/Loading/Loading.context';


// user data
const UserData = () => {
   //// variables
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const [ name, setName ] = useState<string>('');
   const [ residence_name, setResidence_name ] = useState<string>('');
   const [ number_of_residents, setNumber_of_residents ] = useState<string>('');
   //const [ userID, setUserID ] = useState<string>('');


   //// context
   //const { loading, setLoading } = useContext(LoadingContext);


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

   // edit user
   const editUser = async () => {

   };

   // delete user
   const deleteUser = async () => {

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
                        placeholder='Nome'
                        autoComplete='off' value={ name } 
                        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value) }
                        required 
                     />
                     <input 
                        type="text" name="residence_name" 
                        placeholder='Nome de residência'
                        autoComplete='off' value={ residence_name } 
                        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setResidence_name(e.target.value) } 
                        required
                     />
                     <input 
                        type="number" name="number_of_residents" 
                        placeholder='Número de residentes'
                        autoComplete='off' value={ number_of_residents } 
                        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setNumber_of_residents(e.target.value) } 
                        required
                     />

                     <button type='submit' className={ styles.btt_edit }>
                        EDITAR
                     </button>

                     <div 
                        className={ `${styles.data_delete} tooltip tooltip_btt` } 
                        data-tooltip="Deletar"
                        
                     >
                        <img src={ delete_img } alt="delete_img" />
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserData;