import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Referee.css';

const API_URL = "http://localhost:8080/arbitro";

const arbitroVacio = {
    idArbitro: null,
    nombre: "",
    apellido: "",
};

const GestionArbitros = () => {
    const navigate = useNavigate();
    document.title = 'Gestión de Árbitros - BogotáCup';

    const [arbitros, setArbitros] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [arbitroActual, setArbitroActual] = useState(arbitroVacio);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiMessage, setApiMessage] = useState("");

    const fetchArbitros = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/listar`);
            setArbitros(response.data || []);
            setError(null);
        } catch (err) {
            setError("Error al cargar los árbitros. El backend puede estar inactivo.");
            setArbitros([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArbitros();
    }, []);

    const handleCrearClick = () => {
        setModoEdicion(false);
        setArbitroActual(arbitroVacio);
        setMostrarFormulario(true);
        setApiMessage("");
    };

    const handleEditarClick = (arbitro) => {
        setModoEdicion(true);
        setArbitroActual(arbitro);
        setMostrarFormulario(true);
        setApiMessage("");
    };

    const handleCancelarClick = () => {
        setMostrarFormulario(false);
        setApiMessage("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArbitroActual(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGuardarSubmit = async (e) => {
        e.preventDefault();
        setApiMessage("Guardando...");

        const params = new URLSearchParams();
        params.append('nombre', arbitroActual.nombre);
        params.append('apellido', arbitroActual.apellido);

        try {
            if (modoEdicion) {
                await axios.put(`${API_URL}/actualizar/${arbitroActual.idArbitro}`, params);
            } else {
                await axios.post(`${API_URL}/crear`, params);
            }
            setMostrarFormulario(false);
            setApiMessage("");
            fetchArbitros();
        } catch (err) {
            const errorMsg = err.response?.data || "Error al guardar el árbitro.";
            setApiMessage(`Error: ${errorMsg}`);
        }
    };

    const handleEliminarClick = async (idArbitro) => {
        if (window.confirm("¿Está seguro de eliminar este árbitro?")) {
            try {
                await axios.delete(`${API_URL}/eliminar/${idArbitro}`);
                fetchArbitros();
            } catch (err) {
                alert("Error al eliminar el árbitro.");
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
                            <Link to="/dashboard/referee" className="active">
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
                    <h2>Gestión de Árbitros</h2>
                    {!mostrarFormulario && (
                        <button className="btn btn-primary" onClick={handleCrearClick}>
                            + Crear Árbitro
                        </button>
                    )}
                </div>

                {mostrarFormulario && (
                    <div className="content-card">
                        <h3>{modoEdicion ? "Editar Árbitro" : "Crear Nuevo Árbitro"}</h3>
                        <form className="form-gestion" onSubmit={handleGuardarSubmit}>

                            {apiMessage && <p>{apiMessage}</p>}

                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={arbitroActual.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellido">Apellido</label>
                                <input
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    value={arbitroActual.apellido}
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
                        {loading && <p>Cargando árbitros...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {!loading && !error && (
                            <div className="tabla-gestion-container">
                                <table className="tabla-gestion">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {arbitros.length > 0 ? (
                                        arbitros.map((arbitro) => (
                                            <tr key={arbitro.idArbitro}>
                                                <td>{arbitro.idArbitro}</td>
                                                <td>{arbitro.nombre}</td>
                                                <td>{arbitro.apellido}</td>
                                                <td className="acciones">
                                                    <button
                                                        className="btn btn-edit"
                                                        onClick={() => handleEditarClick(arbitro)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleEliminarClick(arbitro.idArbitro)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No hay árbitros registrados.</td>
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

export default GestionArbitros;