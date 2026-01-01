
// import css
import '@root/App.css';

// import hooks
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import pages
import SignIn from '@pages/Signin';
import NotFound from '@pages/NotFound';
import Homepage from '@pages/Homepage';
import Tariffs from '@pages/Tariffs';
import Simulations from '@pages/Simulations';
import MonthlyConsumption from '@pages/MonthlyConsumption';
import Historic from '@pages/Historic';
import AiInsight from '@pages/AiInsight';


// app
function App() {
   return (
      <div className='app'>
         <BrowserRouter>
            <Routes>
               {/* pages */}
               <Route path='/registro' element={ <SignIn /> } />
               <Route path='/' element={ <Homepage /> } />
               <Route path='/tarifas' element={ <Tariffs /> } />
               <Route path='/simulacoes' element={ <Simulations /> } />
               <Route path='/consumosMensais' element={ <MonthlyConsumption /> } />
               <Route path='/historico' element={ <Historic /> } />
               <Route path='/insights' element={ <AiInsight /> } />

               {/* not found page */}
               <Route path='*' element={ <NotFound /> } />
            </Routes>
         </BrowserRouter>
      </div>
   );
};

export default App;