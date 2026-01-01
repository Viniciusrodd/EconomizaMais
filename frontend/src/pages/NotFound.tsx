
// import styles
import styles from '@styles/pages/NotFound.module.css';

// import hooks
import { useNavigate } from 'react-router-dom';


// not found page
const NotFound = () => {
   //// variables
   const navigate = useNavigate();


   //// functions


   // redirect
   const handleRedirect = () => {
      navigate('/registro');
   };


   //// jsx


   return (
      <div className={ styles.container }>
         <h1>Oops!</h1>
         <h2>404 - Página não encontrada...</h2>
         <button type='button' onClick={ handleRedirect }>
            PÁGINA PRINCIPAL
         </button>

         <p>Economiza+</p>
      </div>
   );
};

export default NotFound;