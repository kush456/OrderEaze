import './App.css';
import FeedbackPage from './pages/FeedbackPage';
import MenuPage from './pages/MenuPage';
import { MyBasket } from './pages/MyBasketPage';
import PaymentsPage from './pages/PaymentsPage';
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/mybasket" element={<MyBasket />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    
  );
}

export default App;