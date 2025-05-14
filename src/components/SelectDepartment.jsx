import { useEffect, useState } from 'react';
import axios from 'axios';
import { buildUrl, API_URLS } from '../config/apiConfig';
//import { useAuthStore } from '../../store/auth'; // Asegúrate de tener esto configurado
import { useAuthStore } from '../store/auth'; // Asegúrate de tener esto configurado
export const SelectDepartment = ({ onDeparmentChange }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const token = useAuthStore((state) => state.token);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(buildUrl(`${API_URLS.categories}`), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
             
                setCategories(response.data);
              
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchUsers();
    }, [token]);

    const handleChange = (e) => {
        const selected = e.target.value;
     
        setSelectedCategory(selected);
        onDeparmentChange(selected); // 👈 Notifica al padre
      };

    return (
        <select className="form-control" value={selectedCategory} onChange={handleChange}>
            <option value="">Todos las categorias</option>
            {categories.map(category => (
                <option key={category.id} value={category.name}>
                    {category.name}
                </option>
            ))}
        </select>
    )
}







