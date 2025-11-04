import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Tournament.css';

const API_URL = "http://localhost:8080/torneo";

const torneoVacio = {
    idTorneo: null,
    nombre: "",
    tipo: "Liga",
    categoria: "Libre",
    anio: new Date().getFullYear(),
    estado: 'A',
    idUsuario: 1
};

const GestionTorneos = () => {
    const navigate = useNavigate();
    document.title = 'Gestión de Torneos';

    const [torneos, setTorneos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [torneoActual, setTorneoActual] = useState(torneoVacio);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiMessage, setApiMessage] = useState("");

    const fetchTorneos = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/listar`);
            setTorneos(response.data || []);
            setError(null);
        } catch (err) {
            setError("Error al cargar los torneos. El backend puede estar inactivo.");
            setTorneos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTorneos();
    }, []);

    const handleCrearClick = () => {
        setModoEdicion(false);
        setTorneoActual(torneoVacio);
        setMostrarFormulario(true);
        setApiMessage("");
    };

    const handleEditarClick = (torneo) => {
        setModoEdicion(true);
        setTorneoActual(torneo);
        setMostrarFormulario(true);
        setApiMessage("");
    };

    const handleCancelarClick = () => {
        setMostrarFormulario(false);
        setApiMessage("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTorneoActual(prev => ({
            ...prev,
            [name]: name === 'anio' ? (value ? parseInt(value) : '') : value
        }));
    };

    const handleGuardarSubmit = async (e) => {
        e.preventDefault();
        setApiMessage("Guardando...");

        const torneoPayload = {
            ...torneoActual,
            idUsuario: torneoActual.idUsuario || torneoVacio.idUsuario
        };

        try {
            if (modoEdicion) {
                await axios.put(`${API_URL}/actualizar/${torneoPayload.idTorneo}`, torneoPayload);
            } else {
                await axios.post(`${API_URL}/crear`, torneoPayload);
            }
            setMostrarFormulario(false);
            setApiMessage("");
            fetchTorneos();
        } catch (err) {
            const errorMsg = err.response?.data || "Error al guardar el torneo.";
            setApiMessage(`Error: ${errorMsg}`);
        }
    };

    const handleEstadoToggle = async (idTorneo) => {
        const torneo = torneos.find(t => t.idTorneo === idTorneo);
        if (!torneo) return;

        const nuevoEstado = torneo.estado === 'A' ? 'I' : 'A';
        const torneoActualizado = { ...torneo, estado: nuevoEstado };

        try {
            await axios.put(`${API_URL}/actualizar/${idTorneo}`, torneoActualizado);
            fetchTorneos();
        } catch (err) {
            alert("Error al actualizar el estado del torneo.");
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
                            <Link to="/dashboard/tournament" className="active">
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
            </aside>

            <main className="main-content">
                <div className="main-header">
                    <h2>Gestión de Torneos</h2>
                    {!mostrarFormulario && (
                        <button className="btn btn-primary" onClick={handleCrearClick}>
                            + Crear Torneo
                        </button>
                    )}
                </div>

                {mostrarFormulario && (
                    <div className="content-card">
                        <h3>{modoEdicion ? "Editar Torneo" : "Crear Nuevo Torneo"}</h3>
                        <form className="form-gestion" onSubmit={handleGuardarSubmit}>

                            {apiMessage && <p>{apiMessage}</p>}

                            <div className="form-group form-group-full">
                                <label htmlFor="nombre">Nombre del Torneo</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={torneoActual.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="tipo">Tipo de Torneo</label>
                                <select
                                    id="tipo"
                                    name="tipo"
                                    value={torneoActual.tipo}
                                    onChange={handleChange}
                                >
                                    <option value="Liga">Liga</option>
                                    <option value="Eliminatoria">Eliminatoria</option>
                                    <option value="Mixto">Mixto</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="categoria">Categoría</label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    value={torneoActual.categoria}
                                    onChange={handleChange}
                                >
                                    <option value="Libre">Libre</option>
                                    <option value="Sub-20">Sub-20</option>
                                    <option value="Senior">Senior</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="anio">Año</label>
                                <input
                                    type="number"
                                    id="anio"
                                    name="anio"
                                    value={torneoActual.anio}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="estado">Estado</label>
                                <select
                                    id="estado"
                                    name="estado"
                                    value={torneoActual.estado}
                                    onChange={handleChange}
                                >
                                    <option value="A">Activo</option>
                                    <option value="I">Inactivo</option>
                                </select>
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
                        {loading && <p>Cargando torneos...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {!loading && !error && (
                            <div className="tabla-gestion-container">
                                <table className="tabla-gestion">
                                    <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Categoría</th>
                                        <th>Año</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {torneos.length > 0 ? (
                                        torneos.map((torneo) => (
                                            <tr key={torneo.idTorneo}>
                                                <td>{torneo.nombre}</td>
                                                <td>{torneo.tipo}</td>
                                                <td>{torneo.categoria}</td>
                                                <td>{torneo.anio}</td>
                                                <td>
                                                    <span className={torneo.estado === 'A' ? 'estado-activo' : 'estado-inactivo'}>
                                                        {torneo.estado === 'A' ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                                <td className="acciones">
                                                    <button
                                                        className="btn btn-edit"
                                                        onClick={() => handleEditarClick(torneo)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className={`btn ${torneo.estado === 'A' ? 'btn-danger' : 'btn-success'}`}
                                                        onClick={() => handleEstadoToggle(torneo.idTorneo)}
                                                    >
                                                        {torneo.estado === 'A' ? 'Desactivar' : 'Activar'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">No hay torneos registrados.</td>
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

export default GestionTorneos;