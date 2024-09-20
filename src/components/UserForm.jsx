import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store/users/slice';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  
  // Estado de carga y errores desde el slice
  const { status, error } = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, password };
    dispatch(addUser(newUser));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Loading...' : 'Add User'}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default UserForm;
