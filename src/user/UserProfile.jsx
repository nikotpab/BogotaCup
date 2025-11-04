import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/UserHome.css';

const API_URL = "http://localhost:8080/usuario";

const UserProfile = () => {
    const navigate = useNavigate();
    document.title = 'Mi perfil';

    const [usuario, setUsuario] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        numeroCamiseta: 0,
        fechaNacimiento: "",
        clave: "",
        rol: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiMessage, setApiMessage] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const userEmail = localStorage.getItem('userEmail');
            if (!userEmail) {
                navigate("/login");
                return;
            }

            try {
                setLoading(true);
                const userRes = await axios.get(`${API_URL}/buscar/correo`, { params: { correo: userEmail } });

                setUsuario(userRes.data);
                setFormData({
                    ...userRes.data,
                    clave: ""
                });

            } catch (err) {
                setError("Error al cargar tu perfil.");
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        const isNumber = name === 'numeroCamiseta';
        setFormData(prev => ({
            ...prev,
            [name]: isNumber ? (value ? parseInt(value) : 0) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiMessage("Actualizando...");

        const payload = { ...formData };

        if (payload.clave === null || payload.clave === "") {
            delete payload.clave;
        }

        try {
            await axios.put(`${API_URL}/actualizar/${usuario.idUsuario}`, payload);
            setApiMessage("Perfil actualizado con éxito.");

            if (payload.clave) {
                setFormData(prev => ({ ...prev, clave: "" }));
            }
        } catch (err) {
            const errorMsg = err.response?.data || "Error al actualizar el perfil.";
            setApiMessage(`Error: ${errorMsg}`);
        }
    };

    if (loading) {
        return <div className="user-homepage-loading">Cargando perfil...</div>;
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
                    <Link to="/profile" className="active">Mi perfil</Link>
                    <Link to="/userteam">Mis equipos</Link>
                    <button onClick={handleLogout} className="btn-logout">Cerrar sesión</button>
                </nav>
            </header>

            <main className="user-main-content">

                <div className="content-card">
                    <h3>Información de la Cuenta</h3>
                    <h3>Información de la Cuenta</h3>
                    <h3>Información de la Cuenta</h3>
                    <h3>Información de la Cuenta</h3>
                    <h3>Información de la Cuenta</h3>
                    <form className="form-gestion" onSubmit={handleSubmit}>

                        {apiMessage && <p style={{ color: apiMessage.startsWith("Error") ? 'red' : 'green' }}>{apiMessage}</p>}

                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
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
                                value={formData.apellido}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="correo">Correo (No editable)</label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                value={formData.correo}
                                readOnly
                                disabled
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="clave">Nueva Contraseña</label>
                            <input
                                type="password"
                                id="clave"
                                name="clave"
                                value={formData.clave}
                                onChange={handleChange}
                                placeholder="Dejar en blanco para no cambiar"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="numeroCamiseta">Número de Camiseta</label>
                            <input
                                type="number"
                                id="numeroCamiseta"
                                name="numeroCamiseta"
                                value={formData.numeroCamiseta}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fechaNacimiento">Fecha Nacimiento (No editable)</label>
                            <input
                                type="date"
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                value={formData.fechaNacimiento}
                                readOnly
                                disabled
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                Actualizar Perfil
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default UserProfile;
