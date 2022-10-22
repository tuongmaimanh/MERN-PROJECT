import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Checkout from './pages/checkout/Checkout'
import ListHotel from './pages/listHotel/ListHotel'
import Hotel from  './pages/hotel/Hotel'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import ListHotelByType from './components/listHotelByType/ListHotelByType'
import CheckoutSuccess from './pages/checkoutSuccess/CheckoutSuccess'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/listHotel' element={<ListHotel/>}/>
        <Route path='/hotels/:id' element={<Hotel/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/logout' element={<Home/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/listHotelByType' element={<ListHotelByType/>}/>
        <Route path='/checkoutSuccess' element={<CheckoutSuccess/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
