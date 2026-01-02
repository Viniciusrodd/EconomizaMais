
// import css
import styles from '@styles/components/Navbar.module.css';

// import images
import user_img from '@images/homepage/user.png';

// import services
import { userService } from '@services/User.service';

// import hooks
import { useEffect, useState } from 'react';


// navbar
const Navbar = () => {
   //// variables
   const [ userName, setUserName ] = useState<string>('');


   //// functions


   // get user
   useEffect(() => {
      const getUser = async () => {
         const response = await userService.getUser();
         if(!response){
            console.error('⚠️ Unexpected return from API:', response);
         }

         setUserName(response.name);
      };
      getUser();
   }, []);


   //// jsx


   return (
      <div className={ styles.nav_container }>
         <h1>Economiza+</h1>

         <div className={ styles.nav_account }>
            <img src={ user_img } alt="user_img" />
            <h2>Olá, { userName }</h2>
         </div>
      </div>
   );
};

export default Navbar;