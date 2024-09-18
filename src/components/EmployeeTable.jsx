import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        fetch('http://127.0.0.1:8000/api/employees', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setEmployees(data))
        .catch(error => console.log('Error fetching employees:', error));
    }, []);

    return (
        <>  
            <Link to="/create-employee">
                <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
                    Crear Empleado
                </button>
            </Link> 
            <br /><br />
            <hr /> <br />
            <div>Employee Table</div>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Position</th>
                        <th className="px-4 py-2">Department</th>
                        <th className="px-4 py-2">Actions</th> {/* Nueva columna para acciones */}
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td className="border px-4 py-2">{employee.name}</td>
                            <td className="border px-4 py-2">{employee.position}</td>
                            <td className="border px-4 py-2">{employee.department}</td>
                            <td className="border px-4 py-2">
                                {/* Botón para editar */}
                                <Link to={`/edit-employee/${employee.id}`}>
                                    <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-1 px-4 border border-indigo-800 rounded">
                                        Editar
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default EmployeeTable;
