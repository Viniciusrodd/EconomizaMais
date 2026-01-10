/* eslint-disable react-hooks/exhaustive-deps */

// import css
import styles from '@styles/components/Navbar.module.css';

// import images
import user_img from '@images/homepage/user.png';
import loading_img from '@images/utils/loading.png';

// import interfaces
import type { iModalConfig } from '@interfeces/frontend/Modal.interface';

// import services
import { userService } from '@services/User.service';

// import hooks
import { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

// import components
import Modal from '@components/Modal';

// import context
import { LoadingContext } from '@contexts/Loading/Loading.context';



// navbar
const Navbar = () => {
   //// variables
   const [ modal_display, setModal_display ] = useState<boolean>(false);
   const [ modal_title, setModal_title ] = useState<string>('');
   const [ modal_msg, setModal_msg ] = useState<string>('');
   const [ modal_btt, setmodal_btt ] = useState<boolean | string>(false);
   const [ modal_btt_2, setModal_btt_2 ] = useState<boolean | string>(false);
   const [ userName, setUserName ] = useState<string>('');
   const location = useLocation();


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

   // get user
   useEffect(() => {
      const getUser = async () => {
         setLoading(true);

         try{
            const response = await userService.getUser();
            if(!response){
               console.error('⚠️ Unexpected return from API:', response);
               setLoading(false);
            }
   
            setUserName(response.name);
            setLoading(false);
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


   //// jsx


   return (
      <div className={ styles.nav_container }>
         { /* modal */ }
         <Modal 
            title={ modal_title }
            msg={ modal_msg }
            btt1={ modal_btt }
            btt2={ modal_btt_2 }
            display={ modal_display }
            onClose={ closeModal }
         />     

         <h1>
            <Link to='/'>
               Economiza+
            </Link>
         </h1>

         { loading ? (
            <div className={ styles.nav_account }>
               <img 
                  src={ loading_img } 
                  alt="loading_png"
                  className='loading_img' 
               />
            </div>
         ) : (
            <div className={ styles.nav_account }>
               <img src={ user_img } alt="user_img" />
               <Link to='/usuario'>
                  { location.pathname === '/usuario' ? (
                     <h2 className={ styles.selected }>
                        Olá, { userName }
                     </h2>
                  ) : (
                     <h2>
                        Olá, { userName }
                     </h2>
                  )}
               </Link>
            </div>
         ) }
      </div>
   );
};

export default Navbar;