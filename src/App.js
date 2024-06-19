import './App.css';
import MenuPage from './pages/MenuPage';
import PaymentsPage from './pages/PaymentsPage';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    
    <Routes>
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
    </Routes>
    
  );
}

export default App;