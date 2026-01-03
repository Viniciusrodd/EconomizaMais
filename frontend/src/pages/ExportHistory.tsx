
// import components
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';


// export history
const ExportHistory = () => {
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

export default ExportHistory;