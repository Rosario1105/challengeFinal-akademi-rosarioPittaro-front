import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="text-center mt-10 text-2xl">Bienvenido a Akademi</h1>} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
