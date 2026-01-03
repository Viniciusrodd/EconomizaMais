
// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';


// tariffs
const Tariffs = () => {
   return (
      <div className='container'>
         {/* navbar */}
         <Navbar />

         <div className='homepage'>
            {/* sidebar */}
            <Sidebar />
            
         </div>
      </div>
   );
};

export default Tariffs;