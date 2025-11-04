import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    document.title = 'Panel de Administración - BogotáCup';

    const [stats, setStats] = useState({
        torneosActivos: 0,
        totalEquipos: 0,
        totalJugadores: 0,
        partidosJugados: 0
    });
    const [partidosPorMesData, setPartidosPorMesData] = useState([]);
    const [estadoPartidosData, setEstadoPartidosData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const processStats = (torneos, totalEquipos, totalJugadores, partidos) => {
        const torneosActivos = torneos.filter(t => t.estado === 'A').length;
        const partidosJugados = partidos.filter(p => p.estado === 'Jugado').length;

        return {
            torneosActivos,
            totalEquipos,
            totalJugadores,
            partidosJugados
        };
    };

    const generatePartidosPorMesData = (partidos) => {
        const mesesLabels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        const statsPorMes = Array.from({ length: 12 }, () => ({ goles: 0, partidos: 0 }));

        partidos.forEach(p => {
            if (p.estado !== 'Jugado') return;
            const fecha = new Date(p.fecha_partido || p.fecha);
            if (isNaN(fecha.getTime())) return;

            const mesIndex = fecha.getMonth();
            const totalGoles = p.goles_local + p.goles_visitante;

            statsPorMes[mesIndex].goles += totalGoles;
            statsPorMes[mesIndex].partidos += 1;
        });

        const data = [["Mes", "Goles", "Partidos Jugados"]];
        mesesLabels.forEach((label, idx) => {
            data.push([label, statsPorMes[idx].goles, statsPorMes[idx].partidos]);
        });
        return data;
    };

    const generateEstadoPartidosData = (partidos) => {
        const jugados = partidos.filter(p => p.estado === 'Jugado').length;
        const programados = partidos.filter(p => p.estado === 'Programado').length;

        return [
            ["Estado", "Cantidad"],
            ["Jugados", jugados],
            ["Programados", programados],
        ];
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            const API_URL = "http://localhost:8080";

            try {
                const [
                    torneosRes,
                    equiposRes,
                    jugadoresRes,
                    partidosRes
                ] = await Promise.all([
                    axios.get(`${API_URL}/torneo/listar`),
                    axios.get(`${API_URL}/equipo/contar`),
                    axios.get(`${API_URL}/usuario/contar`),
                    axios.get(`${API_URL}/partido/listar`)
                ]);

                const torneosData = torneosRes.data || [];
                const totalEquipos = equiposRes.data || 0;
                const totalJugadores = jugadoresRes.data || 0;
                const partidosData = partidosRes.data || [];

                const processedStats = processStats(torneosData, totalEquipos, totalJugadores, partidosData);
                const partidosMes = generatePartidosPorMesData(partidosData);
                const estadoPartidos = generateEstadoPartidosData(partidosData);

                setStats(processedStats);
                setPartidosPorMesData(partidosMes);
                setEstadoPartidosData(estadoPartidos);

            } catch (err) {
                setError("Error al cargar los datos. Verifique que el backend esté funcionando y que todos los endpoints (torneo, equipo, usuario, partido) estén accesibles.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        navigate("/");
    };

    if (loading) {
        return <div className="dashboard-container" style={{ padding: '2rem' }}>Cargando datos...</div>;
    }

    if (error) {
        return <div className="dashboard-container" style={{ color: 'red', padding: '2rem' }}>{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div>
                    <h2>BogotáCup</h2>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/dashboard" className="active">
                                    <span className="icon">🏠</span> Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/tournament">
                                    <span className="icon">🏆</span> Torneos
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/team">
                                    <span className="icon">🛡️</span> Equipos
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/player">
                                    <span className="icon">🏃</span> Jugadores
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/game">
                                    <span className="icon">⚽</span> Partidos
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/referee">
                                    <span className="icon">⚖️</span> Árbitros
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/court">
                                    <span className="icon">🏟️</span> Canchas
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/user">
                                    <span className="icon">👥</span> Usuarios
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="btn-logout">
                        <span className="icon"></span> Cerrar Sesión
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <div className="header-cards">
                    <div className="card">
                        <h3>Torneos Activos</h3>
                        <p>{stats.torneosActivos}</p>
                        <div className="card-icon">🏆</div>
                    </div>
                    <div className="card">
                        <h3>Equipos Inscritos</h3>
                        <p>{stats.totalEquipos}</p>
                        <div className="card-icon">🛡️</div>
                    </div>
                    <div className="card">
                        <h3>Jugadores Registrados</h3>
                        <p>{stats.totalJugadores}</p>
                        <div className="card-icon">👥</div>
                    </div>
                    <div className="card">
                        <h3>Partidos Jugados</h3>
                        <p>{stats.partidosJugados}</p>
                        <div className="card-icon">⚽</div>
                    </div>
                </div>

                <div className="charts-container">
                    <div className="chart-card">
                        <h3>Goles y Partidos por Mes</h3>
                        <div className="chart-placeholder">
                            Marcador de posición del gráfico (ComboChart)
                        </div>
                    </div>

                    <div className="chart-card">
                        <h3>Estado de Partidos</h3>
                        <div className="chart-placeholder">
                            Marcador de posición del gráfico (PieChart)
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
