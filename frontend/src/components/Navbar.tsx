
// import css
import styles from '@styles/components/Navbar.module.css';

// import images
import user_img from '@images/homepage/user.png';


// navbar
const Navbar = () => {
   return (
      <div className={ styles.nav_container }>
         <h1>Economiza+</h1>

         <div className={ styles.nav_account }>
            <img src={ user_img } alt="user_img" />
            <h2>Olá, (nome)</h2>
         </div>
      </div>
   );
};

export default Navbar;