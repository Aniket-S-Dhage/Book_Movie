import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Booking from './Components/Pages/Booking';
import ErrorPage from './Components/Pages/ErrorPage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Show from './Components/Pages/Show.jsx';
import BookingUpdate from './Components/Pages/BookingUpdate.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Booking/>}></Route>
          <Route path='/book' element={<Booking/>}></Route>
          <Route path='/update/:bookingID' element={<BookingUpdate/>}></Route>
          <Route path='/show' element={<Show/>}></Route>


          <Route path='*' element={<ErrorPage/>}></Route>
          
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
