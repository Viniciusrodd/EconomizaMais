
// import css
import '@root/App.css';

// import hooks
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import pages
import SignIn from '@pages/Signin';
import NotFound from '@pages/NotFound';


// app
function App() {
   return (
      <div className='app'>
         <BrowserRouter>
            <Routes>
               {/* signIn page */}
               <Route path='/registro' element={ <SignIn /> } />

               {/* not found page */}
               <Route path='*' element={ <NotFound /> } />
            </Routes>
         </BrowserRouter>
      </div>
   );
};

export default App;