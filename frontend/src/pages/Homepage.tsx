
// import css
import styles from '@styles/pages/Homepage.module.css';

// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';


// homepage
const Homepage = () => {
   return (
      <div className={ styles.container }>
         {/* navbar */}
         <Navbar />

         <div className={ styles.homepage }>
            {/* sidebar */}
            <Sidebar />
            
         </div>
      </div>
   );
};

export default Homepage;