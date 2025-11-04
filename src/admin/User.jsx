import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Team.css';

const API_URL = "http://localhost:8080/usuario";

const today = new Date().toISOString().split('T')[0];

const usuarioVacio = {
    idUsuario: null,
    nombre: "",
    apellido: "",
    correo: "",
    clave: "",
    rol: "JUGADOR",
    numeroCamiseta: 0,
    fechaNacimiento: today
};

const GestionUsuarios = () => {
    const navigate = useNavigate();
    document.title = 'Gestión de Usuarios - BogotáCup';

    const [usuarios, setUsuarios] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [usuarioActual, setUsuarioActual] = useState(usuarioVacio);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiMessage, setApiMessage] = useState("");

    const fetchUsuarios = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/listar`);
            setUsuarios(response.data || []);
            setError(null);
        } catch (err) {
            setError("Error al cargar los usuarios. El backend puede estar inactivo.");
            setUsuarios([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleCrearClick = () => {
        setModoEdicion(false);
        setUsuarioActual(usuarioVacio);
        setMostrarFormulario(true);
        setApiMessage("");
    };

    const handleEditarClick = (usuario) => {
        setModoEdicion(true);
        setUsuarioActual({ ...usuario, clave: "" });
        setMostrarFormulario(true);
        setApiMessage("");
    };

    const handleCancelarClick = () => {
        setMostrarFormulario(false);
        setApiMessage("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuarioActual(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGuardarSubmit = async (e) => {
        e.preventDefault();
        setApiMessage("Guardando...");

        const usuarioPayload = { ...usuarioActual };

        if (modoEdicion && usuarioPayload.clave === "") {
            delete usuarioPayload.clave;
        }

        try {
            if (modoEdicion) {
                await axios.put(`${API_URL}/actualizar/${usuarioPayload.idUsuario}`, usuarioPayload);
            } else {
                await axios.post(`${API_URL}/crear`, usuarioPayload);
            }
            setMostrarFormulario(false);
            setApiMessage("");
            fetchUsuarios();
        } catch (err) {
            const errorMsg = err.response?.data || "Error al guardar el usuario.";
            setApiMessage(`Error: ${errorMsg}`);
        }
    };

    const handleEliminarClick = async (idUsuario) => {
        if (window.confirm("¿Está seguro de eliminar este usuario?")) {
            try {
                await axios.delete(`${API_URL}/eliminar/${idUsuario}`);
                fetchUsuarios();
            } catch (err) {
                alert("Error al eliminar el usuario.");
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
                            <Link to="/dashboard/court">
                                <span className="icon">🏟️</span> Canchas
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/user" className="active">
                                <span className="icon">👥</span> Usuarios
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                <div className="main-header">
                    <h2>Gestión de Cuentas de Usuario</h2>
                    {!mostrarFormulario && (
                        <button className="btn btn-primary" onClick={handleCrearClick}>
                            + Crear Usuario
                        </button>
                    )}
                </div>

                {mostrarFormulario && (
                    <div className="content-card">
                        <h3>{modoEdicion ? "Editar Usuario" : "Crear Nuevo Usuario"}</h3>
                        <form className="form-gestion" onSubmit={handleGuardarSubmit}>

                            {apiMessage && <p>{apiMessage}</p>}

                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={usuarioActual.nombre}
                                    onChange={handleChange}
                                    required
                                    disabled={modoEdicion}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellido">Apellido</label>
                                <input
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    value={usuarioActual.apellido}
                                    onChange={handleChange}
                                    required
                                    disabled={modoEdicion}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="correo">Correo</label>
                                <input
                                    type="email"
                                    id="correo"
                                    name="correo"
                                    value={usuarioActual.correo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="clave">Contraseña</label>
                                <input
                                    type="password"
                                    id="clave"
                                    name="clave"
                                    value={usuarioActual.clave}
                                    onChange={handleChange}
                                    placeholder={modoEdicion ? "Dejar en blanco para no cambiar" : ""}
                                    required={!modoEdicion}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="rol">Rol</label>
                                <select
                                    id="rol"
                                    name="rol"
                                    value={usuarioActual.rol}
                                    onChange={handleChange}
                                >
                                    <option value="JUGADOR">Jugador</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>

                            {!modoEdicion && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                        <input
                                            type="date"
                                            id="fechaNacimiento"
                                            name="fechaNacimiento"
                                            value={usuarioActual.fechaNacimiento}
                                            onChange={handleChange}
                                            required
                                            max={today}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="numeroCamiseta">Número de Camiseta</label>
                                        <input
                                            type="number"
                                            id="numeroCamiseta"
                                            name="numeroCamiseta"
                                            value={usuarioActual.numeroCamiseta}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </>
                            )}

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
                        {loading && <p>Cargando usuarios...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {!loading && !error && (
                            <div className="tabla-gestion-container">
                                <table className="tabla-gestion">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Correo</th>
                                        <th>Nombre Completo</th>
                                        <th>Contraseña</th>
                                        <th>Rol</th>
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {usuarios.length > 0 ? (
                                        usuarios.map((usuario) => (
                                            <tr key={usuario.idUsuario}>
                                                <td>{usuario.idUsuario}</td>
                                                <td>{usuario.correo}</td>
                                                <td>{usuario.nombre} {usuario.apellido}</td>
                                                <td>********</td>
                                                <td>{usuario.rol}</td>
                                                <td className="acciones">
                                                    <button
                                                        className="btn btn-edit"
                                                        onClick={() => handleEditarClick(usuario)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleEliminarClick(usuario.idUsuario)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">No hay usuarios registrados.</td>
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

export default GestionUsuarios;