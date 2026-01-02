
// import css
import styles from '@styles/pages/Homepage.module.css';

// import components
import Navbar from '@components/Navbar';


// homepage
const Homepage = () => {
   return (
      <div className={ styles.container }>
         {/* navbar */}
         <Navbar />

         <h1>Homepage</h1>
      </div>
   );
};

export default Homepage;