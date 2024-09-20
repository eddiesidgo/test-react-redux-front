import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const EditEmployee = () => {
    const { id } = useParams(); // Obtener el ID del empleado desde la URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        position: '',
        department: ''
    });

    useEffect(() => {
        // Cargar los datos del empleado para mostrarlos en el formulario
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/employees/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                });
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
                Swal.fire({title: 'Error loading employee data'});
            }
        };

        fetchEmployeeData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({title: 'No token found. Please log in.'});
            navigate('/login');
            return;
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/employees/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            Swal.fire({title: 'Employee updated successfully'});
            navigate('/employee'); // Redirigir de nuevo a la lista de empleados
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Swal.fire({title: 'Your session has expired or the token is invalid. Please log in again.'});
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                console.error('Error updating employee:', error);
                Swal.fire({title: 'An error occurred. Please try again.'});
            }
        }
    };

    return (
        <div>
            <Link className='bg-white hover:bg-gray-100 text-indigo-500 font-semibold py-2 px-4 border border-gray-400 rounded shadow' to="/employee">Back to Employees</Link> <br /><br />
            <h2>Edit Employee</h2> <br />

            <form onSubmit={handleSubmit}>
                <div className="relative mb-6">
                    <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Name</label>
                    <input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        type="text"
                        className="block w-full h-11 px-5 py-2.5 bg-white text-base shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full"
                        required
                    />
                </div>
                <div className="relative mb-6">
                    <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Position</label>
                    <input
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        type="text"
                        className="block w-full h-11 px-5 py-2.5 bg-white text-base shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full"
                        required
                    />
                </div>
                <div className="relative mb-6">
                    <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">Department</label>
                    <input
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        type="text"
                        className="block w-full h-11 px-5 py-2.5 bg-white text-base shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-52 h-12 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6 mb-6"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditEmployee;
