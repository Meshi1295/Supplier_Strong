import './App.css';
import Footer from './components/layout/Footer';
import Home from './pages/home/Home';
import Customers from './components/Customers/Customers'
import Customer from './components/Customer/Customer'
import AddCustomer from './components/AddCustomer/AddCustomer';
import { Routes, Route } from 'react-router-dom'
import NavbarLayout from './components/layout/NavbarLayout';

function App() {
  return (
    <div className="App">
      <NavbarLayout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myCustomer" element={<Customers />} />
        <Route path="/customer/:id" element={<Customer />} />
        <Route path="/newCustomer" element={<AddCustomer />} />
      </Routes>
      < Footer />
    </div>
  );
}

export default App;
