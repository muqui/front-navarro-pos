import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ventasIcon from '../assets/menu/ventas.png'; 
import productsIcon from '../assets/menu/productos.png'; 
import inventoryIcon from '../assets/menu/inventario.png'; 
import settingsIcon from '../assets/menu/config.png'; 
import reportsIcon from '../assets/menu/reportes.png'; 
import repairIcon from '../assets/menu/reparaciones.png'; 
import closeIcon from '../assets/close.png';
import { useAuthStore } from '../store/auth'; 

const Menu = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const handleCloseMenu = () => {
        logout();
        navigate('/'); 
    };
   
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNavbar" aria-controls="menuNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menuNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link to="/sale" className="nav-link active">
                                <img src={ventasIcon} alt="Ventas" width="40" height="40" className="me-2" />
                                Ventas
                            </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/product" className="nav-link active">
                            <img src={productsIcon} alt="Ventas" width="40" height="40" className="me-2" />
                                Productos
                                </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/inventory" className="nav-link active">
                            <img src={inventoryIcon} alt="inventory" width="40" height="40" className="me-2" />
                                Inventario
                                </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/config" className="nav-link active">
                            <img src={settingsIcon} alt="Ventas" width="40" height="40" className="me-2" />
                                Configuracion</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/report" className="nav-link active">
                            <img src={reportsIcon} alt="Ventas" width="40" height="40" className="me-2" />
                                Reportes
                                </Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/repair" className="nav-link active">
                            <img src={repairIcon} alt="Ventas" width="40" height="40" className="me-2" />
                                Reparaciones
                                </Link>
                        </li>
                    </ul>
                    <button
                        className="btn btn-link ms-auto"
                        onClick={handleCloseMenu}
                        style={{ border: 'none', padding: 0 }}
                    >
                        <img src={closeIcon} alt="Cerrar" width="30" height="30" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Menu;

