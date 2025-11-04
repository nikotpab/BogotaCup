import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/UserHome.css';

const API_URL = "http://localhost:8080";

const UserTeams = () => {
    const navigate = useNavigate();
    document.title = 'Mis Equipos';

    const [usuarioId, setUsuarioId] = useState(null);
    const [equipos, setEquipos] = useState([]);
    const [equipoIdInput, setEquipoIdInput] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiMessage, setApiMessage] = useState("");

    const fetchUserTeams = async (currentUserId) => {
        try {
            const teamsRes = await axios.get(`${API_URL}/usuario/${currentUserId}/equipos`);

            if (Array.isArray(teamsRes.data)) {
                setEquipos(teamsRes.data);
            } else {
                setEquipos([]);
            }
        } catch (err) {
            setError("Error al cargar tus equipos.");
            setEquipos([]);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const userEmail = localStorage.getItem('userEmail');
            if (!userEmail) {
                navigate("/login");
                return;
            }

            try {
                setLoading(true);
                const userRes = await axios.get(`${API_URL}/usuario/buscar/correo`, { params: { correo: userEmail } });
                const currentUserId = userRes.data.idUsuario;
                setUsuarioId(currentUserId);
                await fetchUserTeams(currentUserId);

            } catch (err) {
                setError("Error al cargar la información del usuario.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        navigate("/");
    };

    const handleJoinSubmit = async (e) => {
        e.preventDefault();
        if (!equipoIdInput || !usuarioId) {
            setApiMessage("Por favor, ingresa un ID de equipo.");
            return;
        }

        setApiMessage("Inscribiendo al equipo...");

        try {
            await axios.post(`${API_URL}/usuario/${usuarioId}/agregar-equipo/${equipoIdInput}`);
            setApiMessage("¡Te has unido al equipo con éxito!");
            setEquipoIdInput("");
            fetchUserTeams(usuarioId);
        } catch (err) {
            const errorMsg = err.response?.data || "El equipo no existe o ya perteneces a él.";
            setApiMessage(`Error: ${errorMsg}`);
        }
    };

    const handleLeaveTeam = async (equipoId) => {
        if (window.confirm("¿Estás seguro de que quieres salir de este equipo?")) {
            try {
                await axios.delete(`${API_URL}/usuario/${usuarioId}/remover-equipo/${equipoId}`);
                fetchUserTeams(usuarioId);
            } catch (err) {
                alert("Error al salir del equipo.");
            }
        }
    };

    if (loading) {
        return <div className="user-homepage-loading">Cargando equipos...</div>;
    }

    if (error) {
        return <div className="user-homepage-loading" style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div className="user-homepage-container">
            <header className="user-header">
                <div className="user-header-logo">
                    BogotáCup
                </div>
                <nav className="user-nav">
                    <Link to="/home">Inicio</Link>
                    <Link to="/profile">Mi Perfil</Link>
                    <Link to="/userteam" className="active">Mis Equipos</Link>
                    <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
                </nav>
            </header>

            <main className="user-main-content">
                <h1>Equipos</h1>


                <div className="content-card">
                    <form className="form-gestion" onSubmit={handleJoinSubmit}>

                        {apiMessage && <p style={{ color: apiMessage.startsWith("Error") ? 'red' : 'green' }}>{apiMessage}</p>}

                        <div className="form-group" style={{ flexGrow: 2 }}>
                            <label htmlFor="equipoIdInput">ID del Equipo</label>
                            <input
                                type="number"
                                id="equipoIdInput"
                                name="equipoIdInput"
                                value={equipoIdInput}
                                onChange={(e) => setEquipoIdInput(e.target.value)}
                                placeholder="Ingresa el ID del equipo para unirte"
                                required
                            />
                        </div>

                        <div className="form-actions" style={{ alignSelf: 'flex-end', paddingTop: '1.5rem' }}>
                            <button type="submit" className="btn btn-primary">
                                Inscribirme
                            </button>
                        </div>
                    </form>
                </div>

                <div className="content-card">
                    <h3>Equipos Actuales</h3>
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
                                                className="btn btn-danger"
                                                onClick={() => handleLeaveTeam(equipo.idEquipo)}
                                            >
                                                Salir del Equipo
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Actualmente no perteneces a ningún equipo.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserTeams;

