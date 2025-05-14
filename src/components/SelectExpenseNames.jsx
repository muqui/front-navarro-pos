import { useEffect, useState } from 'react';
import axios from 'axios';
import { buildUrl, API_URLS } from '../config/apiConfig';
import { useAuthStore } from '../store/auth'; 
export const SelectExpenseNames = ({ onExpenseName }) => {
     const [names, setNames] = useState([]);
        const [selectedName, setSelectedName] = useState('');
        const token = useAuthStore((state) => state.token);
        useEffect(() => {
            const fetchNames = async () => {
                try {
                    const response = await axios.get(buildUrl(`${API_URLS.expensesNames}`), {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
               
                 setNames(response.data);
                  
                } catch (error) {
                    console.error('Error al obtener los usuarios:', error);
                }
            };
    
            fetchNames();
        }, [token]);

    const handleChange = (e) => {
        const selected = e.target.value;
     
        setSelectedName(selected);
        onExpenseName(selected); // 👈 Notifica al padre
      };
  return (
    <select className="form-control" value={selectedName} onChange={handleChange} >
            <option value="">Todos las categorias</option>
            {names.map(name => (
                <option key={name.id} value={name.name}>
                    {name.name}
                </option>
            ))}
        </select>
  )
}



