import React, { useEffect, useState } from 'react'

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([])
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
        <div>EmployeeTable</div>
        <table className="table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Position</th>
                </tr>
            </thead>
            <tbody>

                {employees.map(employee => (
                    <tr key={employee.id}>
                        <td className="border px-4 py-2">{employee.name}</td>
                        <td className="border px-4 py-2">{employee.position}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>

  )
}

export default EmployeeTable