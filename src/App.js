import './App.css';
import { OrderProvider } from './OrderContext';
import MenuPage from './pages/MenuPage';
import { MyBasket } from './pages/MyBasketPage';
import PaymentsPage from './pages/PaymentsPage';
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <OrderProvider>
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/mybasket" element={<MyBasket />} />
      </Routes>
    </OrderProvider>
  );
}

export default App;