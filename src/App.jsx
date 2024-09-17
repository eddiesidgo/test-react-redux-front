import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Contact from './pages/ContactPage';
import './App.css';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import HooksPage from './pages/HooksPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública para el login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas, usando el componente Layout como wrapper */}
        <Route path="/" element={<Layout />}>
          {/* Solo las rutas protegidas pasan por PrivateRoute */}
          <Route index element={<PrivateRoute component={Home} />} />
          <Route path="/hooks" element={<PrivateRoute component={HooksPage} />} />
          <Route path="/contact" element={<PrivateRoute component={Contact} />} />
          <Route path="/about" element={<PrivateRoute component={About} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
