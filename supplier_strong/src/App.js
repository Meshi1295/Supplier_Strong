import './App.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Home from './pages/home/Home';
import Customers from './components/Customers/Customers'
import Customer from './components/Customer/Customer'
import AddCustomer from './components/AddCustomer/AddCustomer';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myCustomer" element={<Customers />} />
        <Route path="/myCustomer/Customer/:id" element={<Customer />} />
        <Route path="/myCustomer/newCustomer" element={<AddCustomer />} />
      </Routes>
      < Footer />
    </div>
  );
}

export default App;
