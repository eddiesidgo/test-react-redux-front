import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './pages/HomePage';
import Contact from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import HooksPage from './pages/HooksPage';
import EmployeePage from './pages/EmployeePage';
import AboutPage from './pages/AboutPage';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee';

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
          <Route path="/employee" element={<PrivateRoute component={EmployeePage} />} />
          <Route path="/about" element={<PrivateRoute component={AboutPage} />} />
          {/* Ruta para crear un nuevo empleado */}
          <Route path="/create-employee" element={<PrivateRoute component={CreateEmployee} />} />
          {/* Ruta para editar un empleado */}
          <Route path="/edit-employee/:id" element={<PrivateRoute component={EditEmployee} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
