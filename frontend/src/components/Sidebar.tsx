
// import css
import styles from '@styles/components/Sidebar.module.css';

// import hooks
import { Link, useLocation } from 'react-router-dom';


// sidebar
const Sidebar = () => {
   //// variables
   const location = useLocation();


   //// jsx


   return (
      <div className={ styles.sidebar_container }>
         <ul className={ styles.list }>
            <Link to='/tarifas'>
               {
                  location.pathname === '/tarifas' ? (
                     <li className={ styles.li_selected }>Tarifas</li>
                  ) : (
                     <li>Tarifas</li>
                  )
               }
            </Link>
            <Link to='/consumosMensais'>
               {
                  location.pathname === '/consumosMensais' ? (
                     <li className={ styles.li_selected }>Meses de consumo</li>
                  ) : (
                     <li>Meses de consumo</li>
                  )
               }
            </Link>
            <Link to='/simulacoes'>
               {
                  location.pathname === '/simulacoes' ? (
                     <li className={ styles.li_selected }>Conferir simulações</li>
                  ) : (
                     <li>Conferir simulações</li>
                  )
               }
            </Link>
            <Link to='/insights'>
               {
                  location.pathname === '/insights' ? (
                     <li className={ styles.li_selected }>Conferir insights</li>
                  ) : (
                     <li>Conferir insights</li>
                  )
               }
            </Link>
            <Link to='/historico'>
               {
                  location.pathname === '/historico' ? (
                     <li className={ styles.li_selected }>Histórico</li>
                  ) : (
                     <li>Histórico</li>
                  )
               }
            </Link>
         </ul>
      </div>
   );
};

export default Sidebar;