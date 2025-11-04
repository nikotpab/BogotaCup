import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Court.css';

const API_URL = "http://localhost:8080/cancha";

const canchaVacia = {
    idCancha: null,
    nombre: "",
    direccion: "",
};

const GestionCanchas = () => {
    const navigate = useNavigate();
    document.title = 'Gestión de Canchas - BogotáCup';

    const [canchas, setCanchas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [canchaActual, setCanchaActual] = useState(canchaVacia);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiMessage, setApiMessage] = useState("");

    const fetchCanchas = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/listar`);
            setCanchas(response.data || []);
            setError(null);
        } catch (err) {
            setError("Error al cargar las canchas. El backend puede estar inactivo.");
            setCanchas([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCanchas();
    }, []);

    const handleCrearClick = () => {
        setModoEdicion(false);
        setCanchaActual(canchaVacia);
        setMostrarFormulario(true);
        setApiMessage("");
    };

    const handleEditarClick = (cancha) => {
        setModoEdicion(true);
        setCanchaActual(cancha);
        setMostrarFormulario(true);
        setApiMessage("");
    };

    const handleCancelarClick = () => {
        setMostrarFormulario(false);
        setApiMessage("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCanchaActual(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGuardarSubmit = async (e) => {
        e.preventDefault();
        setApiMessage("Guardando...");

        const params = new URLSearchParams();
        params.append('nombre', canchaActual.nombre);
        params.append('direccion', canchaActual.direccion);

        try {
            if (modoEdicion) {
                await axios.put(`${API_URL}/actualizar/${canchaActual.idCancha}`, params);
            } else {
                await axios.post(`${API_URL}/crear`, params);
            }
            setMostrarFormulario(false);
            setApiMessage("");
            fetchCanchas();
        } catch (err) {
            const errorMsg = err.response?.data || "Error al guardar la cancha.";
            setApiMessage(`Error: ${errorMsg}`);
        }
    };

    const handleEliminarClick = async (idCancha) => {
        if (window.confirm("¿Está seguro de eliminar esta cancha?")) {
            try {
                await axios.delete(`${API_URL}/eliminar/${idCancha}`);
                fetchCanchas();
            } catch (err) {
                alert("Error al eliminar la cancha.");
            }
        }
    };

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
                            <Link to="/dashboard/court" className="active">
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
                    <h2>Gestión de Canchas</h2>
                    {!mostrarFormulario && (
                        <button className="btn btn-primary" onClick={handleCrearClick}>
                            + Crear Cancha
                        </button>
                    )}
                </div>

                {mostrarFormulario && (
                    <div className="content-card">
                        <h3>{modoEdicion ? "Editar Cancha" : "Crear Nueva Cancha"}</h3>
                        <form className="form-gestion" onSubmit={handleGuardarSubmit}>

                            {apiMessage && <p>{apiMessage}</p>}

                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={canchaActual.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="direccion">Dirección</label>
                                <input
                                    type="text"
                                    id="direccion"
                                    name="direccion"
                                    value={canchaActual.direccion}
                                    onChange={handleChange}
                                    required
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
                        {loading && <p>Cargando canchas...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {!loading && !error && (
                            <div className="tabla-gestion-container">
                                <table className="tabla-gestion">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Dirección</th>
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {canchas.length > 0 ? (
                                        canchas.map((cancha) => (
                                            <tr key={cancha.idCancha}>
                                                <td>{cancha.idCancha}</td>
                                                <td>{cancha.nombre}</td>
                                                <td>{cancha.direccion}</td>
                                                <td className="acciones">
                                                    <button
                                                        className="btn btn-edit"
                                                        onClick={() => handleEditarClick(cancha)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleEliminarClick(cancha.idCancha)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No hay canchas registradas.</td>
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

export default GestionCanchas;