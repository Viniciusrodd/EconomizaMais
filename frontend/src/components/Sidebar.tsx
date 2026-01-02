
// import css
import styles from '@styles/components/Sidebar.module.css';


// sidebar
const Sidebar = () => {
   return (
      <div className={ styles.sidebar_container }>
         <ul className={ styles.list }>
            <li>Tarifas</li>
            <li>Meses de consumo</li>
            <li>Conferir simulações</li>
            <li>Conferir insights</li>
            <li>Histórico</li>
         </ul>
      </div>
   );
};

export default Sidebar;