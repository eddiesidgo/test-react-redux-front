import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        department: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Obtener el token de localStorage
        const token = localStorage.getItem('token');
        
        // Verificar si el token existe
        if (!token) {
            alert('No token found. Please log in.');
            navigate('/login');  // Redirigir al login si no hay token
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/employees/create', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            alert('Employee added successfully');
            setFormData({
                name: '',
                position: '',
                department: ''
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Si el servidor devuelve un error 401 (no autorizado)
                alert('Your session has expired or the token is invalid. Please log in again.');
                localStorage.removeItem('token'); // Limpiar el token inválido
                navigate('/login');  // Redirigir al login
            } else {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
            <Link className='bg-white hover:bg-gray-100 text-indigo-500 font-semibold py-2 px-4 border border-gray-400 rounded shadow' to="/employee">Back to Employees</Link> <br /><br />
            <h2>Create Employee</h2> <br />

            <form onSubmit={handleSubmit}>
                <div className="relative mb-6">
                    <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                        Name
                        <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                        </svg>
                    </label>
                    <input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        type="text"
                        id="default-search"
                        className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                        placeholder=""
                        required=""
                    />
                </div>
                <div className="relative mb-6">
                    <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                        Position
                        <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                        </svg>
                    </label>
                    <input
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        type="text"
                        id="default-search"
                        className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                        placeholder=""
                        required=""
                    />
                </div>
                <div className="relative mb-6">
                    <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                        Department
                        <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                        </svg>
                    </label>
                    <input
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        type="text"
                        id="default-search"
                        className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                        placeholder=""
                        required=""
                    />
                </div>
                <button
                    type="submit"
                    disabled={formData.name === '' || formData.position === '' || formData.department === ''}
                    className="w-52 h-12 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6 mb-6"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default CreateEmployee;
