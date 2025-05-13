import { useEffect, useState } from 'react';
import axios from 'axios';
//import { useAuthStore } from '../../store/auth'; // Asegúrate de tener esto configurado
import { useAuthStore } from '../store/auth'; // Asegúrate de tener esto configurado
export const SelectUser = ({ onUserChange }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const token = useAuthStore((state) => state.token);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://back-navarro-pos.duckdns.org/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Solo usuarios activos
                const activeUsers = response.data.filter(user => user.isActive === true);
                setUsers(activeUsers);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchUsers();
    }, [token]);

    const handleChange = (e) => {
        const selected = e.target.value;
        setSelectedUser(selected);
        onUserChange(selected); // 👈 Notifica al padre
      };

    return (
        <select className="form-control" value={selectedUser} onChange={handleChange}>
            <option value="">Todos los usuarios</option>
            {users.map(user => (
                <option key={user.id} value={user.name}>
                    {user.name}
                </option>
            ))}
        </select>
    )
}
