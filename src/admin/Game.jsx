import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Game.css';

const API_URL = "http://localhost:8080/partido";
const ARBITRO_API_URL = "http://localhost:8080/arbitro";
const CANCHA_API_URL = "http://localhost:8080/cancha";

const defaultDate = new Date().toISOString().split('T')[0];

const partidoVacio = {
    idPartido: null,
    fecha: defaultDate,
    estadioPartido: "",
    golesVisitante: 0,
    golesLocal: 0,
    tiempoExtra: 0,
    penalesVisitante: 0,
    penalesLocal: 0,
    idArbitro: 0,
    idCancha: 0
};

const GestionPartidos = () => {
    const navigate = useNavigate();
    document.title = 'Gestión de Partidos - BogotáCup';

    const [partidos, setPartidos] = useState([]);
    const [arbitros, setArbitros] = useState([]);
    const [canchas, setCanchas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [partidoActual, setPartidoActual] = useState(partidoVacio);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiMessage, setApiMessage] = useState("");

    const fetchData = async () => {
        try {
            setLoading(true);
            const [partidosRes, arbitrosRes, canchasRes] = await Promise.all([
                axios.get(`${API_URL}/listar`),
                axios.get(`${ARBITRO_API_URL}/listar`),
                axios.get(`${CANCHA_API_URL}/listar`)
            ]);

            if (Array.isArray(partidosRes.data)) {
                setPartidos(partidosRes.data);
            } else {
                setPartidos([]);
            }

            if (Array.isArray(arbitrosRes.data)) {
                setArbitros(arbitrosRes.data);
            } else {
                setArbitros([]);
            }

            if (Array.isArray(canchasRes.data)) {
                setCanchas(canchasRes.data);
            } else {
                setCanchas([]);
            }

            setError(null);
        } catch (err) {
            setError("Error al cargar los datos. El backend puede estar inactivo.");
            setPartidos([]);
            setArbitros([]);
            setCanchas([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCrearClick = () => {
        setModoEdicion(false);
        setPartidoActual(partidoVacio);
        setMostrarFormulario(true);
        setApiMessage("");
    };

    const handleEditarClick = (partido) => {
        setModoEdicion(true);
        setPartidoActual({
            ...partido,
            fecha: partido.fecha ? partido.fecha.split('T')[0] : defaultDate
        });
        setMostrarFormulario(true);
        setApiMessage("");
    };

    const handleCancelarClick = () => {
        setMostrarFormulario(false);
        setApiMessage("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const isNumber = [
            'golesVisitante', 'golesLocal', 'tiempoExtra',
            'penalesVisitante', 'penalesLocal', 'idArbitro', 'idCancha'
        ].includes(name);

        setPartidoActual(prev => ({
            ...prev,
            [name]: isNumber ? (value ? parseInt(value) : 0) : value
        }));
    };

    const handleGuardarSubmit = async (e) => {
        e.preventDefault();
        setApiMessage("Guardando...");

        const partidoPayload = {
            ...partidoActual,
            idArbitro: partidoActual.idArbitro || null,
            idCancha: partidoActual.idCancha || null
        };

        if (!partidoPayload.idArbitro || !partidoPayload.idCancha) {
            setApiMessage("Error: Debe seleccionar un Árbitro y una Cancha.");
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            if (modoEdicion) {
                await axios.put(`${API_URL}/actualizar/${partidoPayload.idPartido}`, partidoPayload, config);
            } else {
                await axios.post(`${API_URL}/crear`, partidoPayload, config);
            }
            setMostrarFormulario(false);
            setApiMessage("");
            fetchData();
        } catch (err) {
            const errorMsg = err.response?.data || "Error al guardar el partido.";
            setApiMessage(`Error: ${errorMsg}`);
        }
    };

    const handleEliminarClick = async (idPartido) => {
        if (window.confirm("¿Está seguro de eliminar este partido?")) {
            try {
                await axios.delete(`${API_URL}/eliminar/${idPartido}`);
                fetchData();
            } catch (err) {
                alert("Error al eliminar el partido.");
            }
        }
    };

    const getArbitroNombre = (id) => {
        const arbitro = arbitros.find(a => a.idArbitro === id);
        return arbitro ? `${arbitro.nombre} ${arbitro.apellido}` : "N/A";
    };

    const getCanchaNombre = (id) => canchas.find(c => c.idCancha === id)?.nombre || "N/A";

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>BogotáCup</h2>
                <nav>
                    <ul>
                        <li>
                            <Link to="/dashboard" className="icon">
                                🏠 Dashboard
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
                            <Link to="/dashboard/game" className="active">
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
            </aside>

            <main className="main-content">
                <div className="main-header">
                    <h2>Gestión de Partidos</h2>
                    {!mostrarFormulario && (
                        <button className="btn btn-primary" onClick={handleCrearClick}>
                            + Crear Partido
                        </button>
                    )}
                </div>

                {mostrarFormulario && (
                    <div className="content-card">
                        <h3>{modoEdicion ? "Editar Partido" : "Crear Nuevo Partido"}</h3>
                        <form className="form-gestion" onSubmit={handleGuardarSubmit}>

                            {apiMessage && <p>{apiMessage}</p>}

                            <div className="form-group">
                                <label htmlFor="fecha">Fecha del Partido</label>
                                <input
                                    type="date"
                                    id="fecha"
                                    name="fecha"
                                    value={partidoActual.fecha ? partidoActual.fecha.split('T')[0] : ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="estadioPartido">Estadio</label>
                                <input
                                    type="text"
                                    id="estadioPartido"
                                    name="estadioPartido"
                                    value={partidoActual.estadioPartido}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="idCancha">Cancha</label>
                                <select
                                    id="idCancha"
                                    name="idCancha"
                                    value={partidoActual.idCancha || 0}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value={0} disabled>Seleccione una cancha...</option>
                                    {canchas.map(cancha => (
                                        <option key={cancha.idCancha} value={cancha.idCancha}>
                                            {cancha.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="idArbitro">Árbitro</label>
                                <select
                                    id="idArbitro"
                                    name="idArbitro"
                                    value={partidoActual.idArbitro || 0}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value={0} disabled>Seleccione un árbitro...</option>
                                    {arbitros.map(arbitro => (
                                        <option key={arbitro.idArbitro} value={arbitro.idArbitro}>
                                            {arbitro.nombre} {arbitro.apellido}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="golesLocal">Goles Local</label>
                                <input
                                    type="number"
                                    id="golesLocal"
                                    name="golesLocal"
                                    value={partidoActual.golesLocal}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="golesVisitante">Goles Visitante</label>
                                <input
                                    type="number"
                                    id="golesVisitante"
                                    name="golesVisitante"
                                    value={partidoActual.golesVisitante}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="tiempoExtra">Tiempo Extra (min)</label>
                                <input
                                    type="number"
                                    id="tiempoExtra"
                                    name="tiempoExtra"
                                    value={partidoActual.tiempoExtra}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                            </div>

                            <div className="form-group">
                                <label htmlFor="penalesLocal">Penales Local</label>
                                <input
                                    type="number"
                                    id="penalesLocal"
                                    name="penalesLocal"
                                    value={partidoActual.penalesLocal}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="penalesVisitante">Penales Visitante</label>
                                <input
                                    type="number"
                                    id="penalesVisitante"
                                    name="penalesVisitante"
                                    value={partidoActual.penalesVisitante}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">
                                    {modoEdicion ? "Actualizar" : "Guardar"}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={handleCancelarClick}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {!mostrarFormulario && (
                    <div className="content-card">
                        {loading && <p>Cargando partidos...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {!loading && !error && (
                            <div className="tabla-gestion-container">
                                <table className="tabla-gestion">
                                    <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Estadio</th>
                                        <th>Resultado</th>
                                        <th>Árbitro</th>
                                        <th>Cancha</th>
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {partidos.length > 0 ? (
                                        partidos.map((partido) => (
                                            <tr key={partido.idPartido}>
                                                <td>{partido.fecha}</td>
                                                <td>{partido.estadioPartido}</td>
                                                <td>{partido.golesLocal} - {partido.golesVisitante}</td>
                                                <td>{getArbitroNombre(partido.idArbitro)}</td>
                                                <td>{getCanchaNombre(partido.idCancha)}</td>
                                                <td className="acciones">
                                                    <button
                                                        className="btn btn-edit"
                                                        onClick={() => handleEditarClick(partido)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleEliminarClick(partido.idPartido)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">No hay partidos registrados.</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default GestionPartidos;

