import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/UserHome.css';

const API_URL = "http://localhost:8080";

const UserHomepage = () => {
    const navigate = useNavigate();
    document.title = 'Inicio';

    const [usuario, setUsuario] = useState(null);
    const [equipos, setEquipos] = useState([]);
    const [partidos, setPartidos] = useState([]);
    const [arbitros, setArbitros] = useState([]);
    const [canchas, setCanchas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userEmail = localStorage.getItem("userEmail");
            if (!userEmail) {
                navigate("/");
                return;
            }

            try {
                setLoading(true);

                const userRes = await axios.get(`${API_URL}/usuario/buscar/correo?correo=${userEmail}`);
                if (userRes.data.correo === "bogotacup@gmail.com") {
                    navigate("/dashboard");
                    return;
                }
                setUsuario(userRes.data);
                const currentUserId = userRes.data.idUsuario;

                const [teamsRes, partidosRes, arbitrosRes, canchasRes] = await Promise.all([
                    axios.get(`${API_URL}/usuario/${currentUserId}/equipos`),
                    axios.get(`${API_URL}/partido/listar`),
                    axios.get(`${API_URL}/arbitro/listar`),
                    axios.get(`${API_URL}/cancha/listar`)
                ]);

                let userTeams = [];
                if (Array.isArray(teamsRes.data)) {
                    userTeams = teamsRes.data;
                }
                setEquipos(userTeams);

                let allPartidos = [];
                if (Array.isArray(partidosRes.data)) {
                    allPartidos = partidosRes.data;
                }
                allPartidos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
                setPartidos(allPartidos);

                if (Array.isArray(arbitrosRes.data)) {
                    setArbitros(arbitrosRes.data);
                }

                if (Array.isArray(canchasRes.data)) {
                    setCanchas(canchasRes.data);
                }

            } catch (err) {
                setError("Error al cargar los datos. El servidor puede estar caído.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        navigate("/");
    };

    if (loading) {
        return <div className="user-homepage-loading">Cargando...</div>;
    }

    if (error) {
        return <div className="user-homepage-loading" style={{ color: 'red' }}>{error}</div>;
    }

    if (!usuario) {
        return <div className="user-homepage-loading">No se pudo cargar el usuario.</div>;
    }

    const getArbitroNombre = (id) => {
        const arbitro = arbitros.find(a => a.idArbitro === id);
        return arbitro ? `${arbitro.nombre} ${arbitro.apellido}` : "N/A";
    };

    const getCanchaNombre = (id) => canchas.find(c => c.idCancha === id)?.nombre || "N/A";

    const today = new Date().toISOString().split('T')[0];
    const proximosPartidos = partidos.filter(p => p.fecha > today);
    const partidosPasados = partidos.filter(p => p.fecha <= today).reverse();

    return (
        <div className="user-homepage-container">
            <header className="user-header">
                <div className="user-header-logo">
                    BogotáCup
                </div>
                <nav className="user-nav">
                    <Link to="/home" className="active">Inicio</Link>
                    <Link to="/profile">Mi perfil</Link>
                    <Link to="/userteam">Mis equipos</Link>
                    <button onClick={handleLogout} className="btn-logout">Cerrar sesión</button>
                </nav>
            </header>

            <main className="user-main-content">
                <h1>Bienvenidx de nuevo, {usuario.nombre}</h1>
                <h1>Bienvenidx de nuevo, {usuario.nombre}</h1>
                <h1>Bienvenidx de nuevo, {usuario.nombre}</h1>
                <h1>Bienvenidx de nuevo, {usuario.nombre}</h1>
                <h1>Bienvenidx de nuevo, {usuario.nombre}</h1>
                <div className="user-grid-container">

                    <div className="user-card">
                        <h3>Mi perfil de jugador</h3>
                        <ul className="user-info-list">
                            <li>
                                <span>Nombre</span>
                                <strong>{usuario.nombre} {usuario.apellido}</strong>
                            </li>
                            <li>
                                <span>Correo</span>
                                <strong>{usuario.correo}</strong>
                            </li>
                            <li>
                                <span>Fecha de Nacimiento</span>
                                <strong>{usuario.fechaNacimiento}</strong>
                            </li>
                            <li>
                                <span>Número de Camiseta</span>
                                <strong>{usuario.numeroCamiseta}</strong>
                            </li>
                            <li>
                                <span>Rol</span>
                                <strong>{usuario.rol}</strong>
                            </li>
                        </ul>
                    </div>

                    <div className="user-card">
                        <h3>Mis equipos</h3>
                        <ul className="user-team-list">
                            {equipos.length > 0 ? equipos.map(equipo => (
                                <li key={equipo.idEquipo}>
                                    <span className="team-color" style={{ backgroundColor: equipo.colorPrimario, borderColor: equipo.colorSecundario }}></span>
                                    <div className="team-info">
                                        <strong>{equipo.nombre}</strong>
                                        <span>DT: {equipo.directorTecnico}</span>
                                    </div>
                                </li>
                            )) : (
                                <p>No estás inscrito en ningún equipo.</p>
                            )}
                        </ul>
                    </div>

                    <div className="user-card large-card">
                        <h3>Próximos partidos</h3>
                        <div className="match-list">
                            {proximosPartidos.length > 0 ? proximosPartidos.map(partido => (
                                <div className="match-item upcoming" key={partido.idPartido}>
                                    <span className="match-date">{partido.fecha}</span>
                                    <span className="match-stadium">Árbitro: {getArbitroNombre(partido.idArbitro)}</span>
                                    <span className="match-teams">Cancha: {getCanchaNombre(partido.idCancha)}</span>
                                </div>
                            )) : (
                                <p>No tienes partidos programados.</p>
                            )}
                        </div>
                    </div>

                    <div className="user-card large-card">
                        <h3>Resultados recientes</h3>
                        <div className="match-list">
                            {partidosPasados.length > 0 ? partidosPasados.slice(0, 5).map(partido => (
                                <div className="match-item played" key={partido.idPartido}>
                                    <div className="match-main-info">
                                        <span className="match-date">{partido.fecha}</span>
                                        <span className="match-stadium">{partido.estadioPartido}</span>
                                        <span className="match-score">
                                            <strong>{partido.golesLocal} - {partido.golesVisitante}</strong>
                                        </span>
                                    </div>
                                    <div className="match-extra-info">
                                        {partido.tiempoExtra > 0 && (
                                            <span>(T. Extra: {partido.tiempoExtra} min)</span>
                                        )}
                                        {(partido.penalesLocal > 0 || partido.penalesVisitante > 0) && (
                                            <span>{`(Penales: ${partido.penalesLocal} - ${partido.penalesVisitante})`}</span>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <p>No has jugado partidos recientemente.</p>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default UserHomepage;

