import React, { useState, useEffect } from 'react';
import { buildUrl, API_URLS } from '../../config/apiConfig';
import { useAuthStore } from '../../store/auth';
import axios from 'axios';

export const CompleteTable = () => {
    const formatDate = (date) => date.toISOString().split('T')[0];
    const today = new Date();
    const [startDate, setStartDate] = useState(formatDate(today));
    const [endDate, setEndDate] = useState(formatDate(today));
    const [reports, setReports] = useState([]);
    const [totales, setTotales] = useState({
        income: 0,
        expense: 0,
        profit: 0
    });
    const token = useAuthStore((state) => state.token);
    useEffect(() => {
        const fetchData = async () => {

            const params = new URLSearchParams();
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);


            const url = buildUrl(`${API_URLS.reports}?${params.toString()}`)
            console.log(url)
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }); // Axios reemplaza fetch aquí
                const data = response.data;

                // Asignamos orderDetails directamente a productos
                setReports(data.reports);
                setTotales({
                    income: data.income || 0,
                    expense: data.expense || 0,
                    profit: data.profit || 0
                });
                console.log(data)

            } catch (error) {
                console.error('Error al obtener los datos con Axios:', error);
            }
        };

        fetchData();
    }, [startDate, endDate]);
    return (
        <div className="container mt-0">

            <div className="row mb-3">
                <div className="col-md-3">
                    <label>Fecha de inicio:</label>
                    <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className="col-md-3">
                    <label>Fecha final:</label>
                    <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>


            </div>

            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th className="d-none d-md-table-cell">Nombre</th>
                        <th className="d-none d-md-table-cell">Ingreso</th>
                        <th className="d-none d-md-table-cell">Egreso</th>
                        <th>Total</th>

                    </tr>
                </thead>
                <tbody>
                    {reports.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center">No hay productos que coincidan con los filtros.</td>
                        </tr>
                    ) : (
                        reports.map((report) => (
                            <tr key={report.id}>
                                <td className="d-none d-md-table-cell">{report.name}</td>
                                <td className="d-none d-md-table-cell">{report.income}</td>
                                <td className="d-none d-md-table-cell">{report.expense}</td>
                                <td>{report.total}</td>

                            </tr>
                        ))
                    )}
                </tbody>

            </table>
            <div className="fixed-bottom bg-light border-top shadow-lg p-3">
                <div className="container py-2">
                    <div className="row align-items-center justify-content-between g-2">
                        {/* Totales */}
                        <div className="col-12   small text-end">
                            <span className="fw-bold">Ingreso: ${totales.income.toFixed(2)}</span>
                            <span className="fw-bold ms-3">Egreso: ${totales.expense.toFixed(2)}</span>
                            <span className="fw-bold ms-3">Ganancia: ${totales.profit.toFixed(2)}</span>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
