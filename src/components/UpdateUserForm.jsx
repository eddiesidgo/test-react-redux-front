import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/users/slice';  // Importa la acción de actualizar

const UpdateUserForm = ({ userId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => 
    state.users.users.find((user) => user.id === userId)
  );

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');  // Dejar la contraseña vacía si no se actualiza

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { id: userId, name, email, password: password || undefined };
    dispatch(updateUser(updatedUser));  // Disparar la acción de actualización
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password (optional)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUserForm;
