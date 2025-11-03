import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Team.css';

const API_URL = "http://localhost:8080/equipo";

const equipoVacio = {
    idEquipo: null,
    nombre: "",
    directorTecnico: "",
    colorPrimario: "#000000",
    colorSecundario: "#FFFFFF",
};

const GestionEquipos = () => {
    const navigate = useNavigate();
    document.title = 'Gestión de Equipos - BogotáCup';

    const [equipos, setEquipos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [equipoActual, setEquipoActual] = useState(equipoVacio);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiMessage, setApiMessage] = useState("");

    const fetchEquipos = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/listar`);
            setEquipos(response.data || []);
            setError(null);
        } catch (err) {
            setError("Error al cargar los equipos. El backend puede estar inactivo.");
            setEquipos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEquipos();
    }, []);

    const handleCrearClick = () => {
        setModoEdicion(false);
        setEquipoActual(equipoVacio);
        setMostrarFormulario(true);
        setApiMessage("");
    };

    const handleEditarClick = (equipo) => {
        setModoEdicion(true);
        setEquipoActual(equipo);
        setMostrarFormulario(true);
        setApiMessage("");
    };

    const handleCancelarClick = () => {
        setMostrarFormulario(false);
        setApiMessage("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEquipoActual(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGuardarSubmit = async (e) => {
        e.preventDefault();
        setApiMessage("Guardando...");

        const equipoPayload = equipoActual;

        try {
            if (modoEdicion) {
                await axios.put(`${API_URL}/actualizar/${equipoPayload.idEquipo}`, equipoPayload);
            } else {
                await axios.post(`${API_URL}/crear`, equipoPayload);
            }
            setMostrarFormulario(false);
            setApiMessage("");
            fetchEquipos();
        } catch (err) {
            const errorMsg = err.response?.data || "Error al guardar el equipo.";
            setApiMessage(`Error: ${errorMsg}`);
        }
    };

    const handleEliminarClick = async (idEquipo) => {
        if (window.confirm("¿Está seguro de eliminar este equipo?")) {
            try {
                await axios.delete(`${API_URL}/eliminar/${idEquipo}`);
                fetchEquipos();
            } catch (err) {
                alert("Error al eliminar el equipo.");
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
                            <Link to="/admin/dashboard/equipos" className="active">
                                <span className="icon">🛡️</span> Equipos
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/dashboard/jugadores">
                                <span className="icon">🏃</span> Jugadores
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/dashboard/partidos">
                                <span className="icon">⚽</span> Partidos
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/dashboard/arbitros">
                                <span className="icon">⚖️</span> Árbitros
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/dashboard/canchas">
                                <span className="icon">🏟️</span> Canchas
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/dashboard/usuarios">
                                <span className="icon">👥</span> Usuarios
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                <div className="main-header">
                    <h2>Gestión de Equipos</h2>
                    {!mostrarFormulario && (
                        <button className="btn btn-primary" onClick={handleCrearClick}>
                            + Crear Equipo
                        </button>
                    )}
                </div>

                {mostrarFormulario && (
                    <div className="content-card">
                        <h3>{modoEdicion ? "Editar Equipo" : "Crear Nuevo Equipo"}</h3>
                        <form className="form-gestion" onSubmit={handleGuardarSubmit}>

                            {apiMessage && <p>{apiMessage}</p>}

                            <div className="form-group">
                                <label htmlFor="nombre">Nombre del Equipo</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={equipoActual.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="directorTecnico">Director Técnico</label>
                                <input
                                    type="text"
                                    id="directorTecnico"
                                    name="directorTecnico"
                                    value={equipoActual.directorTecnico}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="colorPrimario">Color Primario</label>
                                <input
                                    type="color"
                                    id="colorPrimario"
                                    name="colorPrimario"
                                    value={equipoActual.colorPrimario}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="colorSecundario">Color Secundario</label>
                                <input
                                    type="color"
                                    id="colorSecundario"
                                    name="colorSecundario"
                                    value={equipoActual.colorSecundario}
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
                        {loading && <p>Cargando equipos...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {!loading && !error && (
                            <div className="tabla-gestion-container">
                                <table className="tabla-gestion">
                                    <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Director Técnico</th>
                                        <th>Colores</th>
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {equipos.length > 0 ? (
                                        equipos.map((equipo) => (
                                            <tr key={equipo.idEquipo}>
                                                <td>{equipo.nombre}</td>
                                                <td>{equipo.directorTecnico}</td>
                                                <td>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        width: '20px',
                                                        height: '20px',
                                                        backgroundColor: equipo.colorPrimario,
                                                        border: `2px solid ${equipo.colorSecundario}`,
                                                        borderRadius: '4px',
                                                        marginRight: '8px',
                                                        verticalAlign: 'middle'
                                                    }}></span>
                                                    {equipo.colorPrimario} / {equipo.colorSecundario}
                                                </td>
                                                <td className="acciones">
                                                    <button
                                                        className="btn btn-edit"
                                                        onClick={() => handleEditarClick(equipo)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleEliminarClick(equipo.idEquipo)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No hay equipos registrados.</td>
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

export default GestionEquipos;